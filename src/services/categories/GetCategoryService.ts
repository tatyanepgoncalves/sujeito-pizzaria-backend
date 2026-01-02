import prismaClient from '../../prisma/index.ts'

export class GetCategoryService {
  async execute() {
    try {
      const categories = await prismaClient.category.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      })

      return categories
    } catch (err) {
      console.log(err)

      throw new Error('Failed to get categories.')
    }
  }
}
