/**
 * @summary Task controller
 * @description HTTP handlers for task management operations
 */

import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { successResponse, errorResponse } from '@/middleware/crud';
import { taskCreate, taskList } from '@/services/task';
import {
  validateTitulo,
  validateDescricao,
  validateDataVencimentoFormat,
  validateDataVencimentoNotPast,
  validatePrioridade,
} from '@/services/task';
import { TaskPriority } from '@/services/task';

/**
 * @api {post} /internal/task Create Task
 * @apiName CreateTask
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Creates a new task with the specified parameters
 *
 * @apiParam {String} titulo Task title (3-100 characters)
 * @apiParam {String} [descricao] Task description (max 500 characters)
 * @apiParam {String} dataVencimento Due date in DD/MM/YYYY format
 * @apiParam {String} prioridade Priority level: 'Baixa', 'Média', or 'Alta'
 *
 * @apiSuccess {String} id Task identifier (UUID v4)
 * @apiSuccess {String} titulo Task title
 * @apiSuccess {String} descricao Task description
 * @apiSuccess {Date} dataVencimento Due date
 * @apiSuccess {String} prioridade Priority level
 * @apiSuccess {Date} dataCriacao Creation timestamp
 * @apiSuccess {String} status Task status
 *
 * @apiError {String} tituloVazio Title is required
 * @apiError {String} tituloMuitoCurto Title must have at least 3 characters
 * @apiError {String} tituloMuitoLongo Title cannot exceed 100 characters
 * @apiError {String} tituloApenasEspacos Title cannot contain only whitespace
 * @apiError {String} descricaoMuitoLonga Description cannot exceed 500 characters
 * @apiError {String} dataVencimentoInvalida Invalid due date format
 * @apiError {String} dataVencimentoNoPassado Due date cannot be in the past
 * @apiError {String} prioridadeInvalida Invalid priority value
 * @apiError {String} tituloJaExiste Task with this title already exists
 */
export async function postHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @validation Request body schema validation
     */
    const bodySchema = z.object({
      titulo: z.string().min(1, 'tituloVazio'),
      descricao: z.string().optional().default(''),
      dataVencimento: z.string().min(1, 'dataVencimentoVazia'),
      prioridade: z.nativeEnum(TaskPriority, {
        errorMap: () => ({ message: 'prioridadeInvalida' }),
      }),
    });

    const validated = bodySchema.parse(req.body);

    /**
     * @validation Apply business validation rules
     */
    validateTitulo(validated.titulo);
    validateDescricao(validated.descricao);
    validateDataVencimentoFormat(validated.dataVencimento);
    validateDataVencimentoNotPast(validated.dataVencimento);
    validatePrioridade(validated.prioridade);

    /**
     * @rule {fn-task-creation} Create task with validated data
     */
    const task = await taskCreate({
      titulo: validated.titulo,
      descricao: validated.descricao,
      dataVencimento: validated.dataVencimento,
      prioridade: validated.prioridade,
    });

    res.status(201).json(successResponse(task));
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json(errorResponse(error.errors[0].message));
    } else if (error.message) {
      res.status(400).json(errorResponse(error.message));
    } else {
      next(error);
    }
  }
}

/**
 * @api {get} /internal/task List Tasks
 * @apiName ListTasks
 * @apiGroup Task
 * @apiVersion 1.0.0
 *
 * @apiDescription Retrieves all tasks with automatic overdue status update
 *
 * @apiSuccess {Array} tasks Array of task objects
 * @apiSuccess {String} tasks.id Task identifier
 * @apiSuccess {String} tasks.titulo Task title
 * @apiSuccess {String} tasks.descricao Task description
 * @apiSuccess {Date} tasks.dataVencimento Due date
 * @apiSuccess {String} tasks.prioridade Priority level
 * @apiSuccess {Date} tasks.dataCriacao Creation timestamp
 * @apiSuccess {String} tasks.status Task status
 */
export async function getHandler(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    /**
     * @rule {br-002,br-003} Retrieve tasks with overdue status update
     */
    const tasks = await taskList();

    res.json(successResponse(tasks));
  } catch (error: any) {
    next(error);
  }
}
