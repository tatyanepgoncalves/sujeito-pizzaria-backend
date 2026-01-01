import { z } from 'zod'

export const editOrderSchema = z.object({
  body: z.object({
    name: z.string({ message: 'The name should be a string. ' }),
    order_id: z.string({ message: 'The order_id should be a string. ' }),
  }),
})
