import { Router } from 'express'
import { AuthUserController } from './controllers/users/AuthUserController'
import { CreateUserController } from './controllers/users/CreateUserController'
import { validateSchema } from './middleware/validateSchema'
import { schema } from './schemas'

export const router = Router()

// Create a user
router.post(
  '/users',
  validateSchema(schema.createUserSchema),
  new CreateUserController().handle
)

// Login user
router.post(
  '/session',
  validateSchema(schema.authUserSchema),
  new AuthUserController().handle
)
