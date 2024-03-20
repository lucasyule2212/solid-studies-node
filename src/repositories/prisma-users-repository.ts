import { prisma } from '@/services/prisma'
import { Prisma, PrismaClient } from '@prisma/client'
import { UsersRepository } from './interfaces/users-repository'

export class PrismaUsersRepository implements UsersRepository {
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
}
