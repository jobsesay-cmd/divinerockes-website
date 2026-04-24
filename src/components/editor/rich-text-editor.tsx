'use client';

import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import CodeBlock from '@tiptap/extension-code-block';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { cloudinaryImageSchema } from '@/lib/validation/forms';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit, CodeBlock, Image],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose-content min-h-64 rounded-md border border-slate-300 bg-white p-4 focus:outline-none',
      },
    },
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
  });

  const addImage = () => {
    const url = window.prompt('Paste Cloudinary image URL');
    const parsed = cloudinaryImageSchema.safeParse(url);
    if (!parsed.success) return;
    editor?.chain().focus().setImage({ src: parsed.data }).run();
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant="secondary" onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>H2</Button>
        <Button type="button" variant="secondary" onClick={() => editor?.chain().focus().toggleBulletList().run()}>List</Button>
        <Button type="button" variant="secondary" onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>Code</Button>
        <Button type="button" variant="secondary" onClick={addImage}>Image URL</Button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
