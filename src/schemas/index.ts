import { addItemSchema } from './addItemSchema.ts'
import { authUserSchema } from './authUserSchema.ts'
import { createCategorySchema } from './createCategorySchema.ts'
import { createOrderSchema } from './createOrderSchema.ts'
import { createProductSchema } from './createProductSchema.ts'
import { createUserSchema } from './createUserSchema.ts'
import { deleteItemSchema } from './deleteItemSchema.ts'
import { deleteOrderSchema } from './deleteOrderSchema.ts'
import { detailOrderSchema } from './detailOrderSchema.ts'
import { editFinishOrderSchema } from './editFinishOrderSchema.ts'
import { editOrderSchema } from './editOrderSchema.ts'
import { getProductSchema } from './getProductSchema.ts'

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
  editFinishOrderSchema,
  deleteOrderSchema,
}
