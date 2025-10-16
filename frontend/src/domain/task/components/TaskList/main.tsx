/**
 * @component TaskList
 * @summary List component for displaying multiple tasks
 * @domain task
 * @type domain-component
 * @category display
 *
 * @description
 * Displays a list of tasks with:
 * - Section title
 * - Empty state message
 * - Grid layout for task cards
 */

import { TaskCard } from '../TaskCard';
import type { TaskListProps } from './types';

export const TaskList = ({
  tasks,
  title,
  emptyMessage = 'Nenhuma tarefa encontrada',
}: TaskListProps) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      {tasks.length === 0 ? (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <p className="text-gray-500">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};
