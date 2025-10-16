import { cn } from '@/core/utils';
import { buttonVariants } from './variants';
import type { ButtonProps } from './types';

/**
 * @component Button
 * @summary Reusable button component with variants
 * @domain core
 * @type ui-component
 * @category form
 */
export const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Carregando...
        </span>
      ) : (
        children
      )}
    </button>
  );
};
