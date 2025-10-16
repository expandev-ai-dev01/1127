/**
 * @summary Task service type definitions
 * @description Type definitions for task management operations
 */

/**
 * @interface TaskEntity
 * @description Represents a task entity in the system
 *
 * @property {string} id - Unique task identifier (UUID v4)
 * @property {string} titulo - Task title
 * @property {string} descricao - Task description
 * @property {Date} dataVencimento - Task due date
 * @property {TaskPriority} prioridade - Task priority level
 * @property {Date} dataCriacao - Task creation timestamp
 * @property {TaskStatus} status - Current task status
 */
export interface TaskEntity {
  id: string;
  titulo: string;
  descricao: string;
  dataVencimento: Date;
  prioridade: TaskPriority;
  dataCriacao: Date;
  status: TaskStatus;
}

/**
 * @enum TaskPriority
 * @description Task priority levels
 */
export enum TaskPriority {
  Baixa = 'Baixa',
  Media = 'Média',
  Alta = 'Alta',
}

/**
 * @enum TaskStatus
 * @description Task status values
 */
export enum TaskStatus {
  Pendente = 'Pendente',
  Concluida = 'Concluída',
  Vencida = 'Vencida',
}

/**
 * @interface TaskCreateRequest
 * @description Request parameters for task creation
 *
 * @property {string} titulo - Task title
 * @property {string} descricao - Task description (optional)
 * @property {string} dataVencimento - Task due date (DD/MM/YYYY format)
 * @property {TaskPriority} prioridade - Task priority level
 */
export interface TaskCreateRequest {
  titulo: string;
  descricao?: string;
  dataVencimento: string;
  prioridade: TaskPriority;
}

/**
 * @interface TaskCreateResponse
 * @description Response for task creation operation
 *
 * @property {string} id - Created task identifier
 * @property {string} titulo - Task title
 * @property {string} descricao - Task description
 * @property {Date} dataVencimento - Task due date
 * @property {TaskPriority} prioridade - Task priority level
 * @property {Date} dataCriacao - Task creation timestamp
 * @property {TaskStatus} status - Task status
 */
export interface TaskCreateResponse {
  id: string;
  titulo: string;
  descricao: string;
  dataVencimento: Date;
  prioridade: TaskPriority;
  dataCriacao: Date;
  status: TaskStatus;
}
