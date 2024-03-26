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

  async findByUserIdOnDate({ user_id, date }: { user_id: string; date: Date }) {
    const checkInOnSameDate = await this.prismaClient.checkIn.findFirst({
      where: {
        user_id,
        created_at: {
          gte: date,
          lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })

    return checkInOnSameDate || null
  }
}
