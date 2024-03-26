import { CheckIn, Prisma } from '@prisma/client'
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
    const checkInOnSameDate = this.checkIns.find(
      (checkIn) =>
        checkIn.user_id === user_id &&
        checkIn.created_at.toDateString() === date.toDateString(),
    )

    return checkInOnSameDate || null
  }
}
