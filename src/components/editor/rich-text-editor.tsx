'use client';

import { useEffect } from 'react';
import { Extension, Mark, mergeAttributes } from '@tiptap/core';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { Button } from '@/components/ui/button';
import { cloudinaryImageSchema } from '@/lib/validation/forms';

const Underline = Mark.create({
  name: 'underline',

  parseHTML() {
    return [
      { tag: 'u' },
      { style: 'text-decoration', getAttrs: (value) => value === 'underline' && null },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['u', mergeAttributes(HTMLAttributes), 0];
  },
});

const TextAlign = Extension.create({
  name: 'textAlign',

  addGlobalAttributes() {
    return [
      {
        types: ['heading', 'paragraph'],
        attributes: {
          textAlign: {
            default: null,
            parseHTML: (element) => element.style.textAlign || null,
            renderHTML: (attributes) => {
              if (!attributes.textAlign) return {};
              return { style: `text-align: ${attributes.textAlign}` };
            },
          },
        },
      },
    ];
  },
});

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export function RichTextEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      Image,
      TextAlign,
    ],
    content: value,
    editorProps: {
      attributes: {
        class: 'prose-content min-h-64 rounded-md border border-slate-300 bg-white p-4 focus:outline-none',
      },
    },
    onUpdate: ({ editor: current }) => onChange(current.getHTML()),
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!editor || editor.getHTML() === value) return;
    editor.commands.setContent(value, false);
  }, [editor, value]);

  const addImage = () => {
    const url = window.prompt('Paste Cloudinary image URL');
    const parsed = cloudinaryImageSchema.safeParse(url);
    if (!parsed.success) return;
    editor?.chain().focus().setImage({ src: parsed.data }).run();
  };

  const setTextAlign = (alignment: 'left' | 'center' | 'right' | 'justify') => {
    editor?.chain().focus().updateAttributes('paragraph', { textAlign: alignment }).updateAttributes('heading', { textAlign: alignment }).run();
  };

  const btn = 'secondary' as const;

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().setParagraph().run()}>
          P
        </Button>
        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}>
          H1
        </Button>
        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().toggleHeading({ level: 2 }).run()}>
          H2
        </Button>
        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().toggleHeading({ level: 3 }).run()}>
          H3
        </Button>

        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().toggleBold().run()}>
          Bold
        </Button>
        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().toggleItalic().run()}>
          Italic
        </Button>
        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().toggleMark('underline').run()}>
          Underline
        </Button>

        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().toggleBulletList().run()}>
          Bullet List
        </Button>
        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().toggleOrderedList().run()}>
          Numbered List
        </Button>

        <Button type="button" variant={btn} onClick={() => setTextAlign('left')}>
          Left
        </Button>
        <Button type="button" variant={btn} onClick={() => setTextAlign('center')}>
          Center
        </Button>
        <Button type="button" variant={btn} onClick={() => setTextAlign('right')}>
          Right
        </Button>
        <Button type="button" variant={btn} onClick={() => setTextAlign('justify')}>
          Justify
        </Button>

        <Button type="button" variant={btn} onClick={addImage}>
          Image URL
        </Button>

        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().undo().run()}>
          Undo
        </Button>
        <Button type="button" variant={btn} onClick={() => editor?.chain().focus().redo().run()}>
          Redo
        </Button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}