import { TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/ui/cn';

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className={cn(
        'w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2',
        props.className,
      )}
    />
  );
}
