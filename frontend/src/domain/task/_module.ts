/**
 * @module task
 * @summary Task management domain module
 * @domain functional
 * @dependencies TanStack Query, React Hook Form, Zod
 * @version 1.0.0
 * @author Development Team
 * @lastModified 2024-01-15
 */

export * from './types';
export * from './services/taskService';
export * from './hooks/useTaskList';
export * from './constants';
export * from './utils';
export * from './components/TaskForm';
export * from './components/TaskList';

export const moduleMetadata = {
  name: 'task',
  domain: 'functional',
  version: '1.0.0',
  publicComponents: ['TaskForm', 'TaskList', 'TaskCard'],
  publicHooks: ['useTaskList'],
  publicServices: ['taskService'],
  dependencies: {
    internal: ['@/core/components', '@/core/hooks', '@/core/utils'],
    external: ['react', 'react-hook-form', 'zod', '@tanstack/react-query'],
    domains: [],
  },
  exports: {
    components: ['TaskForm', 'TaskList', 'TaskCard'],
    hooks: ['useTaskList'],
    services: ['taskService'],
    types: ['Task', 'TaskPriority', 'TaskStatus', 'CreateTaskDto', 'TaskFormData'],
    utils: ['taskFormSchema'],
    constants: ['TASK_VALIDATION', 'TASK_VALIDATION_MESSAGES'],
  },
} as const;
