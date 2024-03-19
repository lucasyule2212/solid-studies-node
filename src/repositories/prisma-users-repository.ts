import { prisma } from '@/services/prisma'
import { Prisma, PrismaClient } from '@prisma/client'

export class PrismaUsersRepository {
  private prismaClient: PrismaClient

  constructor() {
    this.prismaClient = prisma
  }

  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user = await this.prismaClient.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    })

    return user
  }
}
