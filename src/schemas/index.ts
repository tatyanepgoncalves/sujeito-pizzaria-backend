import { addItemSchema } from './addItemSchema'
import { authUserSchema } from './authUserSchema'
import { createCategorySchema } from './createCategorySchema'
import { createOrderSchema } from './createOrderSchema'
import { createProductSchema } from './createProductSchema'
import { createUserSchema } from './createUserSchema'
import { deleteItemSchema } from './deleteItemSchema'
import { detailOrderSchema } from './detailOrderSchema'
import { editOrderSchema } from './editOrderSchema'
import { getProductSchema } from './getProductSchema'

export const schema = {
  createUserSchema,
  authUserSchema,
  createCategorySchema,
  getProductSchema,
  createProductSchema,
  createOrderSchema,
  addItemSchema,
  deleteItemSchema,
  detailOrderSchema,
  editOrderSchema,
}
