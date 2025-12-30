import prismaClient from '../../prisma/index'

interface createCategoryProps {
  name: string
}

export class CreateCategoryService {
  async execute({ name }: createCategoryProps) {
    // Check category
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        name,
      },
    })

    if (categoryAlreadyExists) {
      throw new Error('The category already exists!')
    }

    try {
      // Create category
      const category = await prismaClient.category.create({
        data: {
          name,
        },
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
      })

      return category
    } catch (err) {
      console.log(err)
      throw new Error('Failed to created category.')
    }
  }
}
