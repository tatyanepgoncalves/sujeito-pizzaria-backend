import { Router } from 'express'
import { AuthUserController } from './controllers/users/AuthUserController'
import { CreateUserController } from './controllers/users/CreateUserController'
import { DetailsUserController } from './controllers/users/DetailsUserController'
import { isAuthenticated } from './middleware/isAuthenticated'
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

// User login details
router.get('/me', isAuthenticated, new DetailsUserController().handle)
