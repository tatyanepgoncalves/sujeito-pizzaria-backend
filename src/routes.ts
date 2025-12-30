import { Router } from 'express'
import { CreateCategoryController } from './controllers/categories/CreateCategoryController'
import { GetCategoryController } from './controllers/categories/GetCategoryController'
import { GetProductController } from './controllers/products/GetProductController'
import { AuthUserController } from './controllers/users/AuthUserController'
import { CreateUserController } from './controllers/users/CreateUserController'
import { DetailsUserController } from './controllers/users/DetailsUserController'
import { isAdmin } from './middleware/isAdmin'
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

// Create category
router.post(
  '/category',
  isAuthenticated,
  isAdmin,
  validateSchema(schema.createCategorySchema),
  new CreateCategoryController().handle
)

// Get categories
router.get('/category', isAuthenticated, new GetCategoryController().handle)

// Get products
router.get(
  '/products',
  isAuthenticated,
  validateSchema(schema.getProductSchema),
  new GetProductController().handle
)
