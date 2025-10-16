import { ButtonHTMLAttributes } from 'react';

/**
 * @type ButtonProps
 * @summary Props for Button component
 */
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
};
