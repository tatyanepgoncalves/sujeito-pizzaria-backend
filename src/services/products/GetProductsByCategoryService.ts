import prismaClient from '../../prisma/index.ts'

interface GetProductsByCategoryServiceProps {
  category_id: string
}

export class GetProductsByCategoryService {
  async execute({ category_id }: GetProductsByCategoryServiceProps) {
    try {
      // Check category if exists
      const categoryAlreadyExists = await prismaClient.category.findMany({
        where: {
          id: category_id,
        },
      })

      if (!categoryAlreadyExists) {
        throw new Error("Category wasn't found.")
      }

      // Get products by category
      const products = await prismaClient.product.findMany({
        where: {
          category_id,
          disabled: false,
        },
        select: {
          id: true,
          name: true,
          price: true,
          description: true,
          banner: true,
          disabled: true,
          category_id: true,
          createdAt: true,
          category: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return products
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
      }

      throw new Error('Failed to get products by category.')
    }
  }
}
