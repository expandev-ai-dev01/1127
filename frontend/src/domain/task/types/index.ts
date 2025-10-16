/**
 * @module task/types
 * @summary Type definitions for task domain
 * @domain task
 */

/**
 * @type TaskPriority
 * @summary Task priority levels
 */
export type TaskPriority = 'Baixa' | 'Média' | 'Alta';

/**
 * @type TaskStatus
 * @summary Task status values
 */
export type TaskStatus = 'Pendente' | 'Concluída' | 'Vencida';

/**
 * @type Task
 * @summary Complete task object
 */
export type Task = {
  id: string;
  titulo: string;
  descricao: string;
  dataVencimento: string;
  prioridade: TaskPriority;
  dataCriacao: string;
  status: TaskStatus;
};

/**
 * @type CreateTaskDto
 * @summary Data transfer object for creating a task
 */
export type CreateTaskDto = {
  titulo: string;
  descricao?: string;
  dataVencimento: string;
  prioridade: TaskPriority;
};

/**
 * @type TaskFormData
 * @summary Form data for task creation
 */
export type TaskFormData = {
  titulo: string;
  descricao: string;
  dataVencimento: string;
  prioridade: TaskPriority;
};
