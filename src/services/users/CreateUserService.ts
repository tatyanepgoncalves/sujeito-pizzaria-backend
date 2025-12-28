import { hash } from 'bcryptjs'
import prismaClient from '../../prisma'

interface createUserProps {
  name: string
  email: string
  password: string
}

export class CreateUserService {
  async execute({ name, email, password }: createUserProps) {
    // Check user alraedy exists
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email,
      },
    })

    if (userAlreadyExists) {
      throw new Error('The user already exists!')
    }

    const passwordHash = await hash(password, 8)

    // Create a user on Database
    const user = await prismaClient.user.create({
      data: {
        name,
        email,
        password: passwordHash,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })
    return user
  }
}
