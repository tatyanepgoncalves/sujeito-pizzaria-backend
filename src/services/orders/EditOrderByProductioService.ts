import prismaClient from '../../prisma'

interface EditOrderByProductionServiceProps {
  name: string
  order_id: string
}

export class EditOrderByProductionService {
  async execute({ name, order_id }: EditOrderByProductionServiceProps) {
    try {
      const orderExists = await prismaClient.order.findFirst({
        where: {
          id: order_id,
        },
      })

      if (!orderExists) {
        throw new Error("The order wasn't found.")
      }

      // Update the order to move the kitchen (draft -> false)
      const updateOrder = await prismaClient.order.update({
        where: {
          id: order_id,
        },
        data: {
          draft: false,
          name,
        },
        select: {
          id: true,
          table: true,
          name: true,
          draft: true,
          status: true,
          createdAt: true,
        },
      })

      return updateOrder
    } catch (err) {
      console.log(err)
      throw new Error('Failed to update the order.')
    }
  }
}
