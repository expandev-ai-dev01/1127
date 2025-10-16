/**
 * @module task/components/TaskList/types
 * @summary Type definitions for TaskList component
 */

import type { Task } from '../../types';

/**
 * @type TaskListProps
 * @summary Props for TaskList component
 */
export type TaskListProps = {
  tasks: Task[];
  title: string;
  emptyMessage?: string;
};
