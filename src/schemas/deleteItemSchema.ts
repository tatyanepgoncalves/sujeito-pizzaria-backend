import z from 'zod'

export const deleteItemSchema = z.object({
  body: z.object({
    item_id: z
      .string({ message: 'The item_id should be a string.' })
      .min(1, { message: 'The item_id is required.' }),
  }),
})
