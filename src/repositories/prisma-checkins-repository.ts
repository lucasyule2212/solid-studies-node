import { prisma } from '@/services/prisma'
import { CheckIn, Prisma, PrismaClient } from '@prisma/client'
import dayjs from 'dayjs'
import { ICheckinsRepository } from './interfaces/checkins-repository'

export class PrismaCheckinsRepository implements ICheckinsRepository {
  private prismaClient: PrismaClient

  constructor() {
    this.prismaClient = prisma
  }

  async findManyByUserId({ user_id, page }: { user_id: string; page: number }) {
    const checkIns = await this.prismaClient.checkIn.findMany({
      where: {
        user_id,
      },
      skip: (page - 1) * 10,
      take: 10,
      orderBy: {
        created_at: 'desc',
      },
    })
    return checkIns
  }

  async countByUserId({ user_id }: { user_id: string }) {
    const count = await this.prismaClient.checkIn.count({
      where: {
        user_id,
      },
    })
    return count
  }

  async findById({ id }: { id: string }) {
    const checkIn = await this.prismaClient.checkIn.findUnique({
      where: {
        id,
      },
    })
    return checkIn
  }

  async save(checkIn: CheckIn) {
    const savedCheckIn = await this.prismaClient.checkIn.update({
      where: {
        id: checkIn.id,
      },
      data: {
        validated_at: checkIn.validated_at,
      },
    })

    return savedCheckIn
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
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkInOnSameDate = await this.prismaClient.checkIn.findFirst({
      where: {
        user_id,
        created_at: {
          gte: startOfDay.toDate(),
          lte: endOfDay.toDate(),
        },
      },
    })

    return checkInOnSameDate
  }
}
