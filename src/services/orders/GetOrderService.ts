import prismaClient from '../../prisma/index.ts'

interface GetOrderServiceProps {
  draft?: string
}

export class GetOrderService {
  async execute({ draft }: GetOrderServiceProps) {
    const orders = await prismaClient.order.findMany({
      where: {
        draft: draft === 'true' ? true : false,
      },
      select: {
        id: true,
        table: true,
        name: true,
        draft: true,
        status: true,
        createdAt: true,
        items: {
          select: {
            id: true,
            amount: true,
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

    return orders
  }
}
