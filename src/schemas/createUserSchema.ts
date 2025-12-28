import { z } from 'zod'

export const createUserSchema = z.object({
  body: z.object({
    name: z
      .string({ message: 'The name needs to be a text.' })
      .min(3, { message: 'The name must be at least 3 characters long.' }),
    email: z.email({ message: 'It needs to be a valid email address.' }),
    password: z
      .string({ message: '' })
      .min(8, { message: 'The password must be at least 8 characters long.' }),
  }),
})
