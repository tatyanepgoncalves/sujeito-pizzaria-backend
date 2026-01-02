import { Readable } from 'node:stream'
import cloudinary from '../../config/cloudinary.ts'
import prismaClient from '../../prisma/index.ts'

interface CreateProductServiceProps {
  name: string
  price: number
  description: string
  category_id: string
  imageBuffer: Buffer
  imageName: string
}

export class CreateProductService {
  async execute({
    name,
    price,
    description,
    category_id,
    imageBuffer,
    imageName,
  }: CreateProductServiceProps) {
    // Check category if exists
    const categoryAlreadyExists = await prismaClient.category.findFirst({
      where: {
        id: category_id,
      },
    })

    if (!categoryAlreadyExists) {
      throw new Error("Category doesn't found.")
    }
    // Upload image to cloudinary and get URL
    let bannerUrl = ''

    try {
      const result = await new Promise<any>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: 'products',
            resource_type: 'image',
            public_id: `${Date.now()}-${imageName.split('.')[0]}`,
          },
          (error, result) => {
            if (error) {
              reject(error)
            } else {
              resolve(result)
            }
          }
        )

        const bufferStream = Readable.from(imageBuffer)
        bufferStream.pipe(uploadStream)
      })

      bannerUrl = result.secure_url
    } catch (error) {
      console.log(error)
    }

    const product = await prismaClient.product.create({
      data: {
        name,
        price,
        description,
        banner: bannerUrl,
        category_id,
      },
      select: {
        id: true,
        name: true,
        price: true,
        description: true,
        category_id: true,
        banner: true,
        createdAt: true,
      },
    })

    return product
  }
}
