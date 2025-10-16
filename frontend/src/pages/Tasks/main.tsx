/**
 * @page TasksPage
 * @summary Main tasks page with creation form and task lists
 * @domain task
 * @type page-component
 * @category task-management
 *
 * @routing
 * - Path: /tasks
 * - Params: none
 * - Query: none
 * - Guards: None (public access)
 *
 * @layout
 * - Layout: RootLayout
 * - Sections: Form, Pending Tasks, Overdue Tasks
 * - Navigation: None
 *
 * @data
 * - Sources: Task API
 * - Loading: Spinner for initial load
 * - Caching: 30 seconds stale time
 *
 * @userFlows
 * - Primary: Create task and view in pending list
 * - Secondary: View overdue tasks
 * - Error: Display error messages for validation and API errors
 */

import { useState } from 'react';
import { useTaskList } from '@/domain/task/hooks/useTaskList';
import { TaskForm } from '@/domain/task/components/TaskForm';
import { TaskList } from '@/domain/task/components/TaskList';
import { LoadingSpinner } from '@/core/components/LoadingSpinner';
import type { TasksPageProps } from './types';
import type { TaskFormData } from '@/domain/task/types';

export const TasksPage = (_props: TasksPageProps) => {
  const [showForm, setShowForm] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { pendingTasks, overdueTasks, isLoading, createTask, isCreating } = useTaskList({
    autoLoad: true,
    onError: (error) => {
      setErrorMessage(error.message || 'Erro ao carregar tarefas');
    },
  });

  const handleCreateTask = async (data: TaskFormData) => {
    try {
      setErrorMessage(null);
      await createTask(data);
      setSuccessMessage('Tarefa criada com sucesso!');
      setShowForm(false);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error: any) {
      const message = error.response?.data?.message || error.message || 'Erro ao criar tarefa';
      setErrorMessage(message);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="large" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Gerenciar Tarefas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          {showForm ? 'Cancelar' : 'Nova Tarefa'}
        </button>
      </div>

      {successMessage && (
        <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
          {successMessage}
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
          {errorMessage}
        </div>
      )}

      {showForm && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Criar Nova Tarefa</h2>
          <TaskForm
            onSubmit={handleCreateTask}
            onCancel={() => setShowForm(false)}
            isSubmitting={isCreating}
          />
        </div>
      )}

      <TaskList
        tasks={pendingTasks}
        title="Tarefas Pendentes"
        emptyMessage="Nenhuma tarefa pendente"
      />

      {overdueTasks.length > 0 && (
        <TaskList
          tasks={overdueTasks}
          title="Tarefas Vencidas"
          emptyMessage="Nenhuma tarefa vencida"
        />
      )}
    </div>
  );
};

export default TasksPage;
