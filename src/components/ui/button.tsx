import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/ui/cn';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
};

const variants: Record<NonNullable<Props['variant']>, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-700',
  secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
  ghost: 'bg-transparent text-slate-700 hover:bg-slate-100',
  danger: 'bg-rose-600 text-white hover:bg-rose-700',
};

export function Button({ className, variant = 'primary', ...props }: Props) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50',
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
