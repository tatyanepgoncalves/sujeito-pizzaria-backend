import { z } from 'zod'

export const createOrderSchema = z.object({
  body: z.object({
    table: z
      .number({ message: "The table's number is required." })
      .int({ message: "The table's number should be a intenger." })
      .positive({
        message: "The table's number should be a positive number.",
      }),
    name: z.string().optional(),
  }),
})
