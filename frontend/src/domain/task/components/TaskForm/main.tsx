/**
 * @component TaskForm
 * @summary Form component for creating new tasks
 * @domain task
 * @type domain-component
 * @category form
 *
 * @description
 * Provides a form for task creation with:
 * - Title, description, due date, and priority fields
 * - Real-time validation with Zod
 * - Error message display
 * - Loading states
 *
 * @validation
 * - Title: 3-100 characters, no whitespace only
 * - Description: max 500 characters, optional
 * - Due date: DD/MM/YYYY format, not in past
 * - Priority: Baixa, Média, or Alta
 */

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/core/components/Button';
import { taskFormSchema } from '../../utils/validation';
import type { TaskFormProps } from './types';
import type { TaskFormData } from '../../types';

export const TaskForm = ({ onSubmit, onCancel, isSubmitting = false }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      dataVencimento: '',
      prioridade: 'Média',
    },
  });

  const handleFormSubmit = async (data: TaskFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div>
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="titulo"
          type="text"
          {...register('titulo')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Digite o título da tarefa"
          disabled={isSubmitting}
        />
        {errors.titulo && <p className="mt-1 text-sm text-red-600">{errors.titulo.message}</p>}
      </div>

      <div>
        <label htmlFor="descricao" className="block text-sm font-medium text-gray-700 mb-1">
          Descrição
        </label>
        <textarea
          id="descricao"
          {...register('descricao')}
          rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="Digite a descrição da tarefa (opcional)"
          disabled={isSubmitting}
        />
        {errors.descricao && (
          <p className="mt-1 text-sm text-red-600">{errors.descricao.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="dataVencimento" className="block text-sm font-medium text-gray-700 mb-1">
          Data de Vencimento <span className="text-red-500">*</span>
        </label>
        <input
          id="dataVencimento"
          type="text"
          {...register('dataVencimento')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          placeholder="DD/MM/AAAA"
          disabled={isSubmitting}
        />
        {errors.dataVencimento && (
          <p className="mt-1 text-sm text-red-600">{errors.dataVencimento.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="prioridade" className="block text-sm font-medium text-gray-700 mb-1">
          Prioridade <span className="text-red-500">*</span>
        </label>
        <select
          id="prioridade"
          {...register('prioridade')}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          disabled={isSubmitting}
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
        {errors.prioridade && (
          <p className="mt-1 text-sm text-red-600">{errors.prioridade.message}</p>
        )}
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" loading={isSubmitting} className="flex-1">
          Criar Tarefa
        </Button>
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
            Cancelar
          </Button>
        )}
      </div>
    </form>
  );
};
