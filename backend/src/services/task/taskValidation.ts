/**
 * @summary Task validation rules
 * @description Validation functions for task operations
 */

import { TaskPriority } from '@/services/task/taskTypes';

/**
 * @summary Validate task title
 * @description Validates title according to business rules
 *
 * @function validateTitulo
 * @module task
 *
 * @param {string} titulo - Task title to validate
 *
 * @throws {Error} When validation fails
 */
export function validateTitulo(titulo: string): void {
  /**
   * @validation RU-001: Minimum 3 characters
   * @throw {tituloMuitoCurto}
   */
  if (titulo.length < 3) {
    throw new Error('tituloMuitoCurto');
  }

  /**
   * @validation RU-002: Maximum 100 characters
   * @throw {tituloMuitoLongo}
   */
  if (titulo.length > 100) {
    throw new Error('tituloMuitoLongo');
  }

  /**
   * @validation RU-003: Cannot contain only whitespace
   * @throw {tituloApenasEspacos}
   */
  if (titulo.trim().length === 0) {
    throw new Error('tituloApenasEspacos');
  }
}

/**
 * @summary Validate task description
 * @description Validates description according to business rules
 *
 * @function validateDescricao
 * @module task
 *
 * @param {string} descricao - Task description to validate
 *
 * @throws {Error} When validation fails
 */
export function validateDescricao(descricao: string): void {
  /**
   * @validation RU-004: Maximum 500 characters
   * @throw {descricaoMuitoLonga}
   */
  if (descricao && descricao.length > 500) {
    throw new Error('descricaoMuitoLonga');
  }
}

/**
 * @summary Validate due date format
 * @description Validates date format DD/MM/YYYY
 *
 * @function validateDataVencimentoFormat
 * @module task
 *
 * @param {string} dataVencimento - Date string to validate
 *
 * @throws {Error} When format is invalid
 */
export function validateDataVencimentoFormat(dataVencimento: string): void {
  /**
   * @validation RU-005: Format DD/MM/AAAA
   * @throw {dataVencimentoInvalida}
   */
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dateRegex.test(dataVencimento)) {
    throw new Error('dataVencimentoInvalida');
  }
}

/**
 * @summary Validate due date is not in the past
 * @description Validates date is not before current date
 *
 * @function validateDataVencimentoNotPast
 * @module task
 *
 * @param {string} dataVencimento - Date string in DD/MM/YYYY format
 *
 * @throws {Error} When date is in the past
 */
export function validateDataVencimentoNotPast(dataVencimento: string): void {
  /**
   * @validation RU-006: Date cannot be before current date
   * @throw {dataVencimentoNoPassado}
   */
  const parts = dataVencimento.split('/');
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10) - 1;
  const year = parseInt(parts[2], 10);

  const dueDate = new Date(year, month, day);
  dueDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dueDate < today) {
    throw new Error('dataVencimentoNoPassado');
  }
}

/**
 * @summary Validate task priority
 * @description Validates priority is one of allowed values
 *
 * @function validatePrioridade
 * @module task
 *
 * @param {string} prioridade - Priority value to validate
 *
 * @throws {Error} When priority is invalid
 */
export function validatePrioridade(prioridade: string): void {
  /**
   * @validation RU-007: Values must be 'Baixa', 'Média', or 'Alta'
   * @throw {prioridadeInvalida}
   */
  const validPriorities = Object.values(TaskPriority);
  if (!validPriorities.includes(prioridade as TaskPriority)) {
    throw new Error('prioridadeInvalida');
  }
}
