/**
 * @module task/hooks/useTaskList/types
 * @summary Type definitions for useTaskList hook
 */

import type { Task, CreateTaskDto } from '../../types';

/**
 * @type UseTaskListOptions
 * @summary Options for useTaskList hook
 */
export type UseTaskListOptions = {
  autoLoad?: boolean;
  onSuccess?: (data: Task[]) => void;
  onError?: (error: Error) => void;
};

/**
 * @type UseTaskListReturn
 * @summary Return type for useTaskList hook
 */
export type UseTaskListReturn = {
  tasks: Task[];
  pendingTasks: Task[];
  overdueTasks: Task[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  createTask: (data: CreateTaskDto) => Promise<Task>;
  isCreating: boolean;
};
