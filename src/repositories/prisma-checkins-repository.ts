import { prisma } from '@/services/prisma'
import { Prisma, PrismaClient } from '@prisma/client'
import { ICheckinsRepository } from './interfaces/checkins-repository'

export class PrismaCheckinsRepository implements ICheckinsRepository {
  private prismaClient: PrismaClient

  constructor() {
    this.prismaClient = prisma
  }

  async create({ gym_id, user_id }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await this.prismaClient.checkIn.create({
      data: {
        gym_id,
        user_id,
      },
    })

    return checkIn
  }
}
