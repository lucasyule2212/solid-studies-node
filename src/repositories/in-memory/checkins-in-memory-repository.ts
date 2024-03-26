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
}
