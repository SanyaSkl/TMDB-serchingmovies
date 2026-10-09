import { z } from 'zod'

export const searchQuerySchema = z
  .string()
  .trim()
  .min(2, 'Enter at least 2 characters.')
  .max(100, 'Request too long')
