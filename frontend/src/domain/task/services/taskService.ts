/**
 * @service taskService
 * @summary Task management service for authenticated endpoints
 * @domain task
 * @type rest-service
 * @apiContext internal
 *
 * @description
 * All methods in this service use authenticatedClient which targets:
 * /api/v1/internal/task/...
 */

import { authenticatedClient } from '@/core/lib/api';
import type { Task, CreateTaskDto } from '../types';
import type { ApiResponse } from '@/core/types';

export const taskService = {
  /**
   * @endpoint POST /api/v1/internal/task
   * @summary Creates new task
   * @param {CreateTaskDto} data - Task creation data
   * @returns {Promise<Task>} Created task
   * @throws {ApiError} Validation or creation errors
   */
  async create(data: CreateTaskDto): Promise<Task> {
    const response = await authenticatedClient.post<ApiResponse<Task>>('/task', data);
    return response.data.data;
  },

  /**
   * @endpoint GET /api/v1/internal/task
   * @summary Fetches list of tasks
   * @returns {Promise<Task[]>} List of tasks
   */
  async list(): Promise<Task[]> {
    const response = await authenticatedClient.get<ApiResponse<Task[]>>('/task');
    return response.data.data;
  },
};
