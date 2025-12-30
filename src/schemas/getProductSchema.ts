import { z } from 'zod'

export const getProductSchema = z.object({
  query: z.object({
    disabled: z.string().optional(),
  }),
})
