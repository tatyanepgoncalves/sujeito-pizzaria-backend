import prismaClient from '../../prisma/index.ts'

interface GetProductServiceProps {
  disabled?: string
}

export class GetProductService {
  async execute({ disabled }: GetProductServiceProps) {
    try {
      const products = await prismaClient.product.findMany({
        where: {
          disabled: disabled === 'true' ? true : false,
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
          name: 'asc',
        },
      })

      return products
    } catch (err) {
      console.log(err)

      throw new Error('Failed to get products.')
    }
  }
}
