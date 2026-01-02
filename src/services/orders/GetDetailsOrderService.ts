import prismaClient from '../../prisma/index.ts'

interface GetDetailsOrderServiceProps {
  order_id: string
}

export class GetDetailsOrderService {
  async execute({ order_id }: GetDetailsOrderServiceProps) {
    try {
      const order = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          items: {
            select: {
              id: true,
              amount: true,
              createdAt: true,
              product: {
                select: {
                  id: true,
                  name: true,
                  price: true,
                  description: true,
                  banner: true,
                },
              },
            },
          },
        },
      })

      if (!order) {
        throw new Error("The order wasn't found.")
      }

      return order
    } catch (err) {
      console.log(err)
      throw new Error('Failed to search details of order.')
    }
  }
}
