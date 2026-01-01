import { z } from 'zod'

export const detailOrderSchema = z.object({
  query: z.object({
    order_id: z
      .string({ message: 'The order_id should be a string.' })
      .min(1, { message: 'The order_id is required.' }),
  }),
})
