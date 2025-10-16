/**
 * @hook useTaskList
 * @summary Manages task list with creation and automatic overdue detection
 * @domain task
 * @type domain-hook
 * @category data
 *
 * @description
 * Provides task list management with:
 * - Automatic fetching and caching
 * - Task creation with optimistic updates
 * - Automatic separation of pending and overdue tasks
 * - Real-time status updates
 */

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useMemo, useEffect } from 'react';
import { taskService } from '../../services/taskService';
import { isDateInPast, parseBrazilianDate } from '@/core/utils/date';
import type { UseTaskListOptions, UseTaskListReturn } from './types';
import type { Task } from '../../types';

export const useTaskList = (options: UseTaskListOptions = {}): UseTaskListReturn => {
  const { autoLoad = true, onSuccess, onError } = options;
  const queryClient = useQueryClient();
  const queryKey = ['tasks'];

  /**
   * @query Task list query
   * @rule {br-002,br-003} Fetch tasks with automatic overdue detection
   */
  const {
    data: tasks = [],
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey,
    queryFn: taskService.list,
    enabled: autoLoad,
    staleTime: 30 * 1000,
  });

  useEffect(() => {
    if (tasks && onSuccess) {
      onSuccess(tasks);
    }
  }, [tasks, onSuccess]);

  useEffect(() => {
    if (error && onError) {
      onError(error as Error);
    }
  }, [error, onError]);

  /**
   * @mutation Create task mutation
   * @rule {fn-task-creation} Create task with optimistic update
   */
  const { mutateAsync: createTask, isPending: isCreating } = useMutation({
    mutationFn: taskService.create,
    onSuccess: (newTask) => {
      queryClient.setQueryData<Task[]>(queryKey, (old = []) => [...old, newTask]);
      queryClient.invalidateQueries({ queryKey });
    },
  });

  /**
   * @computed pendingTasks
   * @rule {br-002} Filter tasks with Pendente status and future due date
   */
  const pendingTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (task.status !== 'Pendente') return false;
      const dueDate = parseBrazilianDate(task.dataVencimento);
      return dueDate && !isDateInPast(dueDate);
    });
  }, [tasks]);

  /**
   * @computed overdueTasks
   * @rule {br-002,br-003} Filter tasks with Vencida status or past due date
   */
  const overdueTasks = useMemo(() => {
    return tasks.filter((task) => {
      if (task.status === 'Vencida') return true;
      if (task.status === 'Concluída') return false;
      const dueDate = parseBrazilianDate(task.dataVencimento);
      return dueDate && isDateInPast(dueDate);
    });
  }, [tasks]);

  return {
    tasks,
    pendingTasks,
    overdueTasks,
    isLoading,
    error: error as Error | null,
    refetch,
    createTask,
    isCreating,
  };
};
