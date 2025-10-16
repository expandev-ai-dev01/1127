import { ReactNode } from 'react';

/**
 * @type ErrorBoundaryProps
 * @summary Props for ErrorBoundary component
 */
export type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

/**
 * @type ErrorBoundaryState
 * @summary State for ErrorBoundary component
 */
export type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};
