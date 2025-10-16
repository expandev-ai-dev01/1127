/**
 * @utility taskValidation
 * @summary Validation utilities for task domain
 * @domain task
 */

import { z } from 'zod';
import { TASK_VALIDATION, TASK_VALIDATION_MESSAGES } from '../constants/validation';
import { isDateInPast, parseBrazilianDate } from '@/core/utils/date';

/**
 * @schema taskFormSchema
 * @summary Zod schema for task form validation
 * @rule {ru-001,ru-002,ru-003,ru-004,ru-005,ru-006,ru-007}
 */
export const taskFormSchema = z.object({
  titulo: z
    .string()
    .min(1, TASK_VALIDATION_MESSAGES.tituloVazio)
    .min(TASK_VALIDATION.TITULO_MIN_LENGTH, TASK_VALIDATION_MESSAGES.tituloMuitoCurto)
    .max(TASK_VALIDATION.TITULO_MAX_LENGTH, TASK_VALIDATION_MESSAGES.tituloMuitoLongo)
    .refine((val) => val.trim().length > 0, {
      message: TASK_VALIDATION_MESSAGES.tituloApenasEspacos,
    }),
  descricao: z
    .string()
    .max(TASK_VALIDATION.DESCRICAO_MAX_LENGTH, TASK_VALIDATION_MESSAGES.descricaoMuitoLonga)
    .optional(),
  dataVencimento: z
    .string()
    .min(1, TASK_VALIDATION_MESSAGES.dataVencimentoInvalida)
    .refine(
      (val) => {
        const date = parseBrazilianDate(val);
        return date !== null;
      },
      {
        message: TASK_VALIDATION_MESSAGES.dataVencimentoInvalida,
      }
    )
    .refine(
      (val) => {
        const date = parseBrazilianDate(val);
        return date && !isDateInPast(date);
      },
      {
        message: TASK_VALIDATION_MESSAGES.dataVencimentoNoPassado,
      }
    ),
  prioridade: z.enum(['Baixa', 'Média', 'Alta'], {
    errorMap: () => ({ message: TASK_VALIDATION_MESSAGES.prioridadeInvalida }),
  }),
});
