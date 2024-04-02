import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'
import { randomUUID } from 'node:crypto'
import { ICheckinsRepository } from '../interfaces/checkins-repository'

export class CheckinsInMemoryRepository implements ICheckinsRepository {
  public checkIns: CheckIn[] = []
  async create({
    gym_id,
    user_id,
    validated_at,
  }: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      gym_id,
      user_id,
      validated_at: validated_at ? new Date(validated_at) : null,
      created_at: new Date(),
    }

    this.checkIns.push(checkIn)

    return checkIn
  }

  async findByUserIdOnDate({ user_id, date }: { user_id: string; date: Date }) {
    const startOfDay = dayjs(date).startOf('date')
    const endOfDay = dayjs(date).endOf('date')

    const checkInOnSameDate = this.checkIns.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)

      const isOnSameDate =
        checkInDate.isAfter(startOfDay) && checkInDate.isBefore(endOfDay)

      return checkIn.user_id === user_id && isOnSameDate
    })

    return checkInOnSameDate || null
  }

  async findManyByUserId({ user_id, page }: { user_id: string; page: number }) {
    return this.checkIns
      .filter((checkIn) => checkIn.user_id === user_id)
      .slice((page - 1) * 20, page * 20)
  }

  async countByUserId({ user_id }: { user_id: string }) {
    return this.checkIns.filter((checkIn) => checkIn.user_id === user_id).length
  }

  async findById({ id }: { id: string }) {
    return this.checkIns.find((checkIn) => checkIn.id === id) || null
  }

  async save(checkIn: CheckIn) {
    const checkInIndex = this.checkIns.findIndex(
      (checkInItem) => checkInItem.id === checkIn.id,
    )

    if (checkInIndex > 0) {
      this.checkIns[checkInIndex] = checkIn
    }

    return checkIn
  }
}
