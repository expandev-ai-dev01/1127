/**
 * @summary Task business logic and rules
 * @description Business operations for task management
 */

import { v4 as uuidv4 } from 'uuid';
import { TaskEntity, TaskCreateRequest, TaskPriority, TaskStatus } from '@/services/task/taskTypes';

/**
 * @summary In-memory task storage
 * @description Temporary storage for tasks during session
 */
const taskStorage: Map<string, TaskEntity> = new Map();

/**
 * @summary Create a new task
 * @description Creates a new task with validation and automatic field generation
 *
 * @function taskCreate
 * @module task
 *
 * @param {TaskCreateRequest} params - Task creation parameters
 * @param {string} params.titulo - Task title
 * @param {string} params.descricao - Task description (optional)
 * @param {string} params.dataVencimento - Task due date (DD/MM/YYYY)
 * @param {TaskPriority} params.prioridade - Task priority level
 *
 * @returns {Promise<TaskEntity>} Created task entity
 *
 * @throws {Error} When titulo is duplicated
 * @throws {Error} When validation fails
 */
export async function taskCreate(params: TaskCreateRequest): Promise<TaskEntity> {
  /**
   * @validation Check for duplicate title
   * @throw {tituloJaExiste}
   */
  const existingTask = Array.from(taskStorage.values()).find(
    (task) => task.titulo.toLowerCase() === params.titulo.toLowerCase()
  );

  if (existingTask) {
    throw new Error('tituloJaExiste');
  }

  /**
   * @rule {fn-task-creation} Generate system fields for new task
   */
  const taskId = uuidv4();
  const dataCriacao = new Date();
  const dataVencimento = parseDateFromBrazilianFormat(params.dataVencimento);

  /**
   * @rule {br-002} Check if task is already overdue at creation
   */
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const isOverdue = dataVencimento < today;

  const newTask: TaskEntity = {
    id: taskId,
    titulo: params.titulo,
    descricao: params.descricao || '',
    dataVencimento: dataVencimento,
    prioridade: params.prioridade,
    dataCriacao: dataCriacao,
    status: isOverdue ? TaskStatus.Vencida : TaskStatus.Pendente,
  };

  /**
   * @rule {br-004} Store task in memory during session
   */
  taskStorage.set(taskId, newTask);

  return newTask;
}

/**
 * @summary Get all tasks
 * @description Retrieves all tasks from memory storage
 *
 * @function taskList
 * @module task
 *
 * @returns {Promise<TaskEntity[]>} Array of all tasks
 */
export async function taskList(): Promise<TaskEntity[]> {
  /**
   * @rule {br-002,br-003} Update overdue tasks status
   */
  updateOverdueTasks();

  return Array.from(taskStorage.values());
}

/**
 * @summary Get task by ID
 * @description Retrieves a specific task by its identifier
 *
 * @function taskGet
 * @module task
 *
 * @param {string} id - Task identifier
 *
 * @returns {Promise<TaskEntity | null>} Task entity or null if not found
 */
export async function taskGet(id: string): Promise<TaskEntity | null> {
  return taskStorage.get(id) || null;
}

/**
 * @summary Update overdue tasks
 * @description Checks and updates status of tasks with past due dates
 *
 * @function updateOverdueTasks
 * @module task
 *
 * @returns {void}
 */
function updateOverdueTasks(): void {
  /**
   * @rule {br-002,br-006} Mark tasks as overdue when due date is in the past
   */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  taskStorage.forEach((task) => {
    if (task.status !== TaskStatus.Concluida && task.dataVencimento < today) {
      task.status = TaskStatus.Vencida;
    }
  });
}

/**
 * @summary Parse Brazilian date format
 * @description Converts DD/MM/YYYY string to Date object
 *
 * @function parseDateFromBrazilianFormat
 * @module task
 *
 * @param {string} dateString - Date in DD/MM/YYYY format
 *
 * @returns {Date} Parsed date object
 *
 * @throws {Error} When date format is invalid
 */
function parseDateFromBrazilianFormat(dateString: string): Date {
  const parts = dateString.split('/');
  if (parts.length !== 3) {
    throw new Error('dataVencimentoInvalida');
  }

  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);

  if (isNaN(date.getTime())) {
    throw new Error('dataVencimentoInvalida');
  }

  return date;
}

/**
 * @summary Clear all tasks
 * @description Removes all tasks from memory (for testing purposes)
 *
 * @function taskClear
 * @module task
 *
 * @returns {void}
 */
export function taskClear(): void {
  taskStorage.clear();
}
