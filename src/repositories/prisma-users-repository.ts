import { prisma } from '@/services/prisma'
import { Prisma, PrismaClient } from '@prisma/client'
import { IUsersRepository } from './interfaces/users-repository'

export class PrismaUsersRepository implements IUsersRepository {
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

  async findByEmail(email: string) {
    const user = await this.prismaClient.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findById(id: string) {
    const user = await this.prismaClient.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }
}
