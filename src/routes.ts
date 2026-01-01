import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer'
import { CreateCategoryController } from './controllers/categories/CreateCategoryController'
import { GetCategoryController } from './controllers/categories/GetCategoryController'
import { AddItemOrderController } from './controllers/orders/AddItemOrderController'
import { CreateOrderController } from './controllers/orders/CreateOrderController'
import { DeleteItemController } from './controllers/orders/DeleteItemController'
import { DeleteOrderController } from './controllers/orders/DeleteOrderController'
import { EditFinishOrderController } from './controllers/orders/EditFinishOrderController'
import { EditOrderByProductionController } from './controllers/orders/EditOrderByProductionController'
import { GetDetailsOrderController } from './controllers/orders/GetDetailsOrderController'
import { GetOrderController } from './controllers/orders/GetOrderController'
import { CreateProductController } from './controllers/products/CreateProductController'
import { DeleteProductController } from './controllers/products/DeleteProductController'
import { GetProductByCategoryController } from './controllers/products/GetProductByCategoryController'
import { GetProductController } from './controllers/products/GetProductController'
import { AuthUserController } from './controllers/users/AuthUserController'
import { CreateUserController } from './controllers/users/CreateUserController'
import { DetailsUserController } from './controllers/users/DetailsUserController'
import { isAdmin } from './middleware/isAdmin'
import { isAuthenticated } from './middleware/isAuthenticated'
import { validateSchema } from './middleware/validateSchema'
import { schema } from './schemas'

export const router = Router()
const upload = multer(uploadConfig)

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

// Create products
router.post(
  '/products',
  isAuthenticated,
  isAdmin,
  upload.single('file'),
  new CreateProductController().handle
)

// Get products by category
router.get(
  '/category/products',
  isAuthenticated,
  new GetProductByCategoryController().handle
)

// Delete product
router.delete(
  '/product',
  isAuthenticated,
  isAdmin,
  new DeleteProductController().handle
)

// Get orders
router.get('/orders', isAuthenticated, new GetOrderController().handle)

// Create order
router.post(
  '/order',
  isAuthenticated,
  validateSchema(schema.createOrderSchema),
  new CreateOrderController().handle
)

// Add item to the order
router.post(
  '/order/add',
  isAuthenticated,
  validateSchema(schema.addItemSchema),
  new AddItemOrderController().handle
)

// Delete item to the order
router.delete(
  '/order/remove',
  isAuthenticated,
  validateSchema(schema.deleteItemSchema),
  new DeleteItemController().handle
)

// Get details to the order
router.get(
  '/order/detail',
  isAuthenticated,
  validateSchema(schema.detailOrderSchema),
  new GetDetailsOrderController().handle
)

// Edit order to production
router.put(
  '/order/send',
  isAuthenticated,
  validateSchema(schema.editOrderSchema),
  new EditOrderByProductionController().handle
)

// Change the status order to ready
router.put(
  '/order/finish',
  isAuthenticated,
  validateSchema(schema.editFinishOrderSchema),
  new EditFinishOrderController().handle
)

// Delete the order
router.delete(
  '/orders',
  isAuthenticated,
  validateSchema(schema.deleteOrderSchema),
  new DeleteOrderController().handle
)
