/**
 * @constants validation
 * @summary Validation constants for task domain
 * @domain task
 */

export const TASK_VALIDATION = {
  TITULO_MIN_LENGTH: 3,
  TITULO_MAX_LENGTH: 100,
  DESCRICAO_MAX_LENGTH: 500,
} as const;

export const TASK_VALIDATION_MESSAGES = {
  tituloVazio: 'O título da tarefa é obrigatório',
  tituloMuitoCurto: 'O título deve ter pelo menos 3 caracteres',
  tituloMuitoLongo: 'O título não pode exceder 100 caracteres',
  tituloApenasEspacos: 'O título não pode conter apenas espaços em branco',
  descricaoMuitoLonga: 'A descrição não pode exceder 500 caracteres',
  dataVencimentoInvalida: 'A data de vencimento deve estar no formato DD/MM/AAAA',
  dataVencimentoNoPassado: 'A data de vencimento não pode ser anterior à data atual',
  prioridadeInvalida: 'A prioridade deve ser Baixa, Média ou Alta',
  tituloJaExiste: 'Já existe uma tarefa com este título',
} as const;
