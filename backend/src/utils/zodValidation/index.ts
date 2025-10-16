import { z } from 'zod';

/**
 * @summary Common Zod validation schemas
 * @description Reusable validation schemas for common data types
 */

export const zString = z.string().min(1, 'stringRequired');
export const zNullableString = z.string().nullable();
export const zName = z.string().min(1, 'nameRequired').max(100, 'nameMaxLength');
export const zNullableDescription = z
  .string()
  .max(500, 'descriptionMaxLength')
  .nullable()
  .default('');
export const zFK = z.coerce.number().int().positive('foreignKeyInvalid');
export const zNullableFK = z.coerce.number().int().positive('foreignKeyInvalid').nullable();
export const zBit = z.coerce.number().int().min(0).max(1);
export const zDateString = z.string().datetime();
export const zEmail = z.string().email('invalidEmail');
export const zPassword = z.string().min(8, 'passwordMinLength');
