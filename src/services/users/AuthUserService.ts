import { compare } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../../env'
import prismaClient from '../../prisma'

interface AuthUserServiceProps {
  email: string
  password: string
}

export class AuthUserService {
  async execute({ email, password }: AuthUserServiceProps) {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    })

    if (!user) {
      throw new Error('The user already exists!')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('The password is incorrect.')
    }

    // Generate token
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '30d',
      }
    )

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    }
  }
}
