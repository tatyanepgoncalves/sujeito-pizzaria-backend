import { z } from 'zod'

export const authUserSchema = z.object({
  body: z.object({
    email: z.email({ message: 'It needs to be a valid email address.' }),
    password: z
      .string({ message: '' })
      .min(8, { message: 'The password must be at least 8 characters long.' }),
  }),
})
