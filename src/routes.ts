import { Router } from 'express'
import { CreateUserController } from './controllers/users/CreateUserController'
import { validateSchema } from './middleware/validateSchema'
import { createUserSchema } from './schemas/userSchema'

export const router = Router()

// Get all users
router.post(
  '/users',
  validateSchema(createUserSchema),
  new CreateUserController().handle
)
