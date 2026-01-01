import prismaClient from '../../prisma/index'

interface DeleteItemServiceProps {
  item_id: string
}

export class DeleteItemService {
  async execute({ item_id }: DeleteItemServiceProps) {
    try {
      const itemExists = await prismaClient.item.findFirst({
        where: {
          id: item_id,
        },
      })

      if (!itemExists) {
        throw new Error("The item wasn't found.")
      }

      await prismaClient.item.delete({
        where: {
          id: item_id,
        },
      })

      return { message: 'The item deleted sucessfully.' }
    } catch (err) {
      console.log(err)
      throw new Error('Failed to delete item to the order.')
    }
  }
}
