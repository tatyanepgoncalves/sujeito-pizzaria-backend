import { z } from 'zod'

export const editFinishOrderSchema = z.object({
  body: z.object({
    order_id: z.string({ message: 'The order_id should be a string. ' }),
  }),
})
