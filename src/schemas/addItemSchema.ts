import { z } from 'zod'

export const addItemSchema = z.object({
  body: z.object({
    order_id: z
      .string({ message: 'Order should be a string' })
      .min(1, 'The order_id is required.'),
    product_id: z
      .string({ message: 'The producto should be a string' })
      .min(1, "The product's id is required."),
    amount: z
      .number()
      .int('Quantify should be an integer.')
      .positive('Quantify should be a positive number.'),
  }),
})
