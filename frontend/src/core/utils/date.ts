import { format, parseISO, isValid, parse } from 'date-fns';
import { ptBR } from 'date-fns/locale';

/**
 * @utility formatDate
 * @summary Formats a date to Brazilian format (DD/MM/YYYY)
 * @domain core
 * @type utility-function
 * @category date
 */
export const formatDate = (date: Date | string): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  if (!isValid(dateObj)) return '';
  return format(dateObj, 'dd/MM/yyyy', { locale: ptBR });
};

/**
 * @utility parseBrazilianDate
 * @summary Parses a Brazilian date format (DD/MM/YYYY) to Date object
 * @domain core
 * @type utility-function
 * @category date
 */
export const parseBrazilianDate = (dateString: string): Date | null => {
  const parsed = parse(dateString, 'dd/MM/yyyy', new Date());
  return isValid(parsed) ? parsed : null;
};

/**
 * @utility isDateInPast
 * @summary Checks if a date is in the past
 * @domain core
 * @type utility-function
 * @category date
 */
export const isDateInPast = (date: Date | string): boolean => {
  const dateObj = typeof date === 'string' ? parseBrazilianDate(date) : date;
  if (!dateObj || !isValid(dateObj)) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return dateObj < today;
};
