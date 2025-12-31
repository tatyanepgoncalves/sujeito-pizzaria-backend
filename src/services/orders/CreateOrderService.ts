import prismaClient from '../../prisma'

interface CreateOrderServiceProps {
  table: number
  name?: string
}

export class CreateOrderService {
  async execute({ table, name }: CreateOrderServiceProps) {
    const orderExists = await prismaClient.order.findFirst({
      where: {
        table,
      },
    })

    if (orderExists) {
      throw new Error('This table is occuped.')
    }

    try {
      const order = await prismaClient.order.create({
        data: {
          table,
          name: name ?? '',
        },
        select: {
          id: true,
          table: true,
          draft: true,
          name: true,
          createdAt: true,
        },
      })
      return order
    } catch (err) {
      console.log(err)
      throw new Error('Failed to create a order.')
    }
  }
}
