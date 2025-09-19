import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from './button';
import { Loader2 } from 'lucide-react';

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
  variant?: 'primary' | 'accent' | 'glass';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ label, loading = false, variant = 'primary', size = 'md', icon, className, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-primary to-primary-glow text-primary-foreground hover:shadow-[0_0_40px_rgba(255,165,0,0.4)] hover:scale-105',
      accent: 'bg-gradient-to-r from-accent to-accent-glow text-accent-foreground hover:shadow-[0_0_40px_rgba(0,179,255,0.4)] hover:scale-105',
      glass: 'glass-button text-foreground hover:glow-primary'
    };

    const sizes = {
      sm: 'h-9 px-4 text-sm',
      md: 'h-12 px-6 text-base',
      lg: 'h-14 px-8 text-lg'
    };

    return (
      <Button
        ref={ref}
        className={cn(
          'font-semibold rounded-xl transition-all duration-300 ease-out shadow-lg',
          'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
          'flex items-center gap-2 relative overflow-hidden',
          variants[variant],
          sizes[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {!loading && icon && icon}
        <span className="relative z-10">{label}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      </Button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';