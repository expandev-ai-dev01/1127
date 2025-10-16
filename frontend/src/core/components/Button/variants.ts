import { cva } from 'class-variance-authority';

/**
 * @variants buttonVariants
 * @summary Style variants for Button component
 */
export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        primary: 'bg-primary-500 text-white hover:bg-primary-600 focus-visible:ring-primary-500',
        secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus-visible:ring-gray-500',
        danger: 'bg-danger-500 text-white hover:bg-danger-600 focus-visible:ring-danger-500',
        ghost: 'hover:bg-gray-100 text-gray-700 focus-visible:ring-gray-500',
      },
      size: {
        small: 'h-8 px-3 text-sm',
        medium: 'h-10 px-4 text-base',
        large: 'h-12 px-6 text-lg',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  }
);
