import { z } from 'zod'

export const createProductSchema = z.object({
  name: z
    .string()
    .min(2, { message: 'Name must be at least 2 characters long.' }),
  price: z
    .string('Price is required.')
    .min(1, { message: 'Price is required.' }),
  description: z.string().min(2, { message: 'Description is required.' }),
  category_id: z.string(),
})
