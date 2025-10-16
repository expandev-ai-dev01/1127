/**
 * @component TaskCard
 * @summary Card component for displaying task information
 * @domain task
 * @type domain-component
 * @category display
 *
 * @description
 * Displays task information with:
 * - Title and description
 * - Due date and creation date
 * - Priority badge with color coding
 * - Status indicator
 */

import { formatDate } from '@/core/utils/date';
import { cn } from '@/core/utils';
import type { TaskCardProps } from './types';

const priorityColors = {
  Baixa: 'bg-green-100 text-green-800',
  Média: 'bg-yellow-100 text-yellow-800',
  Alta: 'bg-red-100 text-red-800',
};

const statusColors = {
  Pendente: 'bg-blue-100 text-blue-800',
  Concluída: 'bg-green-100 text-green-800',
  Vencida: 'bg-red-100 text-red-800',
};

export const TaskCard = ({ task }: TaskCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-900">{task.titulo}</h3>
        <div className="flex gap-2">
          <span
            className={cn(
              'px-2 py-1 text-xs font-medium rounded-full',
              priorityColors[task.prioridade]
            )}
          >
            {task.prioridade}
          </span>
          <span
            className={cn('px-2 py-1 text-xs font-medium rounded-full', statusColors[task.status])}
          >
            {task.status}
          </span>
        </div>
      </div>

      {task.descricao && <p className="text-gray-600 text-sm mb-3">{task.descricao}</p>}

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div>
          <span className="font-medium">Vencimento:</span> {task.dataVencimento}
        </div>
        <div>
          <span className="font-medium">Criada em:</span> {formatDate(task.dataCriacao)}
        </div>
      </div>
    </div>
  );
};
