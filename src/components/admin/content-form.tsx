'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RichTextEditor } from '@/components/editor/rich-text-editor';
import { apiPost } from '@/lib/api/client';

const schema = z.object({
  title: z.string().min(2),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  summary: z.string().optional(),
  imageUrl: z.string().url().optional().or(z.literal('')),
  content: z.string().min(1),
});

type Values = z.infer<typeof schema>;

function buildPayload(endpoint: string, values: Values, content: string) {
  const workflow = { status: 'published' };
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
      categoryIds: [],
    };
  }
  if (endpoint === '/api/news') {
    return {
      title: values.title,
      slug: values.slug,
      excerpt: values.summary,
      body: content,
      coverImageUrl: values.imageUrl || undefined,
      workflow,
    };
  }
  return { title: values.title, slug: values.slug, content, workflow, seo: undefined };
}

function getErrorMessage(error: unknown) {
  if (!(error instanceof Error)) return 'Failed to save content. Please try again.';

  if (error.message.includes('401')) return 'Your session has expired. Please sign in again.';
  if (error.message.includes('403')) return 'You do not have permission to perform this action.';
  if (error.message.includes('422')) return 'Please fix validation issues and try again.';

  return error.message;
}

export function ContentForm({
  endpoint,
  titleLabel = 'Title',
  supportsCoverImage = false,
}: {
  endpoint: string;
  titleLabel?: string;
  supportsCoverImage?: boolean;
}) {
  const [content, setContent] = useState('<p></p>');
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitting, errors },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { content: '<p></p>', imageUrl: '' },
  });

  const onSubmit = async (values: Values) => {
    setApiError(null);

    try {
      await apiPost(endpoint, buildPayload(endpoint, values, content));
      toast.success('Saved successfully');
    } catch (error) {
      const message = getErrorMessage(error);
      setApiError(message);
      toast.error(message);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      {apiError && (
        <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {apiError}
        </p>
      )}

      <Input placeholder={titleLabel} {...register('title')} />
      {errors.title && <p className="text-sm text-rose-600">{errors.title.message}</p>}

      <Input placeholder="slug" {...register('slug')} />
      <Textarea placeholder="Summary" {...register('summary')} />
      {supportsCoverImage && (
        <Input placeholder="Cloudinary cover image URL" {...register('imageUrl')} />
      )}

      <RichTextEditor
        value={content}
        onChange={(html) => {
          setContent(html);
          setValue('content', html, { shouldValidate: true });
        }}
      />

      <Button disabled={isSubmitting}>{isSubmitting ? 'Saving...' : 'Save'}</Button>
    </form>
  );
}