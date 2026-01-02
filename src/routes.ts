import { Router } from 'express'
import multer from 'multer'
import uploadConfig from './config/multer.ts'
import { CreateCategoryController } from './controllers/categories/CreateCategoryController.ts'
import { GetCategoryController } from './controllers/categories/GetCategoryController.ts'
import { AddItemOrderController } from './controllers/orders/AddItemOrderController.ts'
import { CreateOrderController } from './controllers/orders/CreateOrderController.ts'
import { DeleteItemController } from './controllers/orders/DeleteItemController.ts'
import { DeleteOrderController } from './controllers/orders/DeleteOrderController.ts'
import { EditFinishOrderController } from './controllers/orders/EditFinishOrderController.ts'
import { EditOrderByProductionController } from './controllers/orders/EditOrderByProductionController.ts'
import { GetDetailsOrderController } from './controllers/orders/GetDetailsOrderController.ts'
import { GetOrderController } from './controllers/orders/GetOrderController.ts'
import { CreateProductController } from './controllers/products/CreateProductController.ts'
import { DeleteProductController } from './controllers/products/DeleteProductController.ts'
import { GetProductByCategoryController } from './controllers/products/GetProductByCategoryController.ts'
import { GetProductController } from './controllers/products/GetProductController.ts'
import { AuthUserController } from './controllers/users/AuthUserController.ts'
import { CreateUserController } from './controllers/users/CreateUserController.ts'
import { DetailsUserController } from './controllers/users/DetailsUserController.ts'
import { isAdmin } from './middleware/isAdmin.ts'
import { isAuthenticated } from './middleware/isAuthenticated.ts'
import { validateSchema } from './middleware/validateSchema.ts'
import { schema } from './schemas/index.ts'

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
