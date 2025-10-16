import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * @utility cn
 * @summary Utility function to merge Tailwind CSS classes
 * @description Combines clsx and tailwind-merge for optimal class merging
 * @domain core
 * @type utility-function
 * @category styling
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
