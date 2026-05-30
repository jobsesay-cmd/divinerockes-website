'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/editor/rich-text-editor';
import { apiGet, apiPatch, apiPost } from '@/lib/api/client';

const contentStatuses = ['DRAFT', 'PUBLISHED', 'SCHEDULED', 'ARCHIVED'] as const;

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  summary: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  content: z.string().min(1),
  categoryId: z.string().optional(),
  status: z.enum(contentStatuses).default('PUBLISHED'),
  completedOn: z.string().optional(),
  galleryImageUrls: z.string().optional(),
});

type Values = z.infer<typeof schema>;
type Category = { id: string; name: string; slug: string; type: string };

type ProjectEditPayload = {
  id: string;
  title: string;
  slug: string;
  summary?: string | null;
  description?: unknown;
  completedOn?: string | Date | null;
  status?: Values['status'];
  featured?: boolean;
  projectCategories?: { categoryId: string }[];
  seo?: {
    ogImageUrl?: string | null;
    structuredData?: unknown;
  } | null;
};

function contentToHtml(value: unknown) {
  return typeof value === 'string' && value.trim().length > 0 ? value : '<p></p>';
}

function formatDateInput(value?: string | Date | null) {
  if (!value) return '';
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? '' : date.toISOString().slice(0, 10);
}

function galleryTextFromSeo(seo?: ProjectEditPayload['seo']) {
  const structuredData = seo?.structuredData;
  if (!structuredData || typeof structuredData !== 'object' || Array.isArray(structuredData)) return '';

  const gallery = (structuredData as { galleryImageUrls?: unknown }).galleryImageUrls;
  return Array.isArray(gallery) ? gallery.filter((url): url is string => typeof url === 'string').join('\n') : '';
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function buildPayload(endpoint: string, values: Values, content: string) {
  const workflow = { status: values.status };
  if (endpoint === '/api/services') {
    return { name: values.title, slug: values.slug, summary: values.summary, content, workflow };
  }
  if (endpoint === '/api/projects') {
    return {
      title: values.title,
      slug: values.slug,
      summary: values.summary,
      description: content,
      workflow,
      featured: false,
      completedOn: values.completedOn || undefined,
      categoryIds: values.categoryId ? [values.categoryId] : [],
      coverImageUrl: values.imageUrl || undefined,
      galleryImageUrls: values.galleryImageUrls
        ?.split(/\r?\n/)
        .map((url) => url.trim())
        .filter(Boolean),
    };
  }
  if (endpoint === '/api/news') {
    return { title: values.title, slug: values.slug, excerpt: values.summary, body: content, coverImageUrl: values.imageUrl || undefined, workflow };
  }
  return { title: values.title, slug: values.slug, content, workflow, seo: undefined };
}

export function ContentForm({ endpoint, titleLabel = 'Title', supportsCoverImage = false }: { endpoint: string; titleLabel?: string; supportsCoverImage?: boolean }) {
  const [content, setContent] = useState('<p></p>');
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProjectFeatured, setEditingProjectFeatured] = useState(false);
  const isProjectForm = endpoint === '/api/projects';
  const slugEditedRef = useRef(false);

  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting, errors } } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { content: '<p></p>', imageUrl: '', categoryId: '', status: 'PUBLISHED', completedOn: '', galleryImageUrls: '' },
  });

  const title = watch('title') ?? '';
  const slugPreview = useMemo(() => slugify(title), [title]);

  useEffect(() => {
    if (!isProjectForm) return;
    void apiGet<Category[]>('/api/categories')
      .then(setCategories)
      .catch(() => setCategories([]));
  }, [isProjectForm]);

  useEffect(() => {
    if (!slugEditedRef.current) {
      setValue('slug', slugPreview, { shouldValidate: Boolean(slugPreview) });
    }
  }, [setValue, slugPreview]);

  useEffect(() => {
    if (!isProjectForm) return;

    const handleEditProject = (event: Event) => {
      const project = (event as CustomEvent<ProjectEditPayload>).detail;
      if (!project?.id) return;

      const projectContent = contentToHtml(project.description);
      slugEditedRef.current = true;
      setEditingProjectId(project.id);
      setEditingProjectFeatured(Boolean(project.featured));
      setContent(projectContent);
      reset({
        title: project.title,
        slug: project.slug,
        summary: project.summary ?? '',
        imageUrl: project.seo?.ogImageUrl ?? '',
        content: projectContent,
        categoryId: project.projectCategories?.[0]?.categoryId ?? '',
        status: project.status ?? 'PUBLISHED',
        completedOn: formatDateInput(project.completedOn),
        galleryImageUrls: galleryTextFromSeo(project.seo),
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('admin:edit-project', handleEditProject);
    return () => window.removeEventListener('admin:edit-project', handleEditProject);
  }, [isProjectForm, reset]);

  const clearForm = () => {
    setEditingProjectId(null);
    setEditingProjectFeatured(false);
    setContent('<p></p>');
    slugEditedRef.current = false;
    reset({ content: '<p></p>', imageUrl: '', categoryId: '', status: 'PUBLISHED', completedOn: '', galleryImageUrls: '' });
  };

  const onSubmit = async (values: Values) => {
    const payload = buildPayload(endpoint, values, content);
    if (isProjectForm && editingProjectId) {
      await apiPatch(`/api/projects/${editingProjectId}`, { ...payload, featured: editingProjectFeatured });
      toast.success('Project updated successfully');
    } else {
      await apiPost(endpoint, payload);
      toast.success('Saved successfully');
    }
    clearForm();
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {isProjectForm && editingProjectId ? (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900">
          Editing existing project. Update the fields below, then click "Update project".
        </div>
      ) : null}

      <Input placeholder={titleLabel} {...register('title')} />
      {errors.title && <p className="text-sm text-rose-600">{errors.title.message}</p>}

      <div className="grid gap-2 md:grid-cols-[1fr_auto]">
        <Input
          placeholder="slug"
          {...register('slug', {
            onChange: () => {
              slugEditedRef.current = true;
            },
          })}
        />
        <Button
          type="button"
          variant="secondary"
          onClick={() => {
            slugEditedRef.current = false;
            setValue('slug', slugPreview, { shouldValidate: true });
          }}
        >
          Generate slug
        </Button>
      </div>
      {errors.slug && <p className="text-sm text-rose-600">{errors.slug.message}</p>}

      <Textarea placeholder="Summary" {...register('summary')} />

      {(supportsCoverImage || isProjectForm) && <Input placeholder="Cloudinary cover image URL" {...register('imageUrl')} />}

      {isProjectForm ? (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-700">Project status</span>
              <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" {...register('status')}>
                {contentStatuses.map((status) => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-700">Project date</span>
              <Input type="date" {...register('completedOn')} />
            </label>

            <label className="block space-y-1">
              <span className="text-sm font-medium text-slate-700">Project category</span>
              <select className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm" {...register('categoryId')}>
                <option value="">Select category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-sm font-medium text-slate-700">Project gallery images</span>
            <Textarea
              placeholder="Paste one Cloudinary gallery image URL per line"
              rows={4}
              {...register('galleryImageUrls')}
            />
            <span className="text-xs text-slate-500">These images appear in the public project details gallery.</span>
          </label>
        </div>
      ) : null}

      <RichTextEditor
        value={content}
        onChange={(html) => {
          setContent(html);
          setValue('content', html, { shouldValidate: true });
        }}
      />
      {errors.content && <p className="text-sm text-rose-600">{errors.content.message}</p>}

      <div className="flex flex-wrap gap-2">
        <Button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : editingProjectId ? 'Update project' : 'Save'}</Button>
        {editingProjectId ? (
          <Button type="button" variant="secondary" onClick={clearForm}>
            Cancel edit
          </Button>
        ) : null}
      </div>
    </form>
  );
}