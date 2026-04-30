import { PropsWithChildren } from 'react';
import { cn } from '@/lib/ui/cn';

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <article className={cn('rounded-xl border border-slate-200 bg-white p-6 shadow-sm', className)}>{children}</article>;
}
