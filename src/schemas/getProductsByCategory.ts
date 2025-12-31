import z from 'zod'

export const getProductsByCategory = z.object({
  query: z.object({
    category_id: z.string({ message: 'Category ID is required.' }),
  }),
})
