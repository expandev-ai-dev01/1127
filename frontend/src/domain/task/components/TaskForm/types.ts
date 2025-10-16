/**
 * @module task/components/TaskForm/types
 * @summary Type definitions for TaskForm component
 */

import type { TaskFormData } from '../../types';

/**
 * @type TaskFormProps
 * @summary Props for TaskForm component
 */
export type TaskFormProps = {
  onSubmit: (data: TaskFormData) => Promise<void>;
  onCancel?: () => void;
  isSubmitting?: boolean;
};
