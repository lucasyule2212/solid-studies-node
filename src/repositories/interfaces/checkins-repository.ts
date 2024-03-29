import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckinsRepository {
  create({
    gym_id,
    user_id,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate({
    user_id,
    date,
  }: {
    user_id: string
    date: Date
  }): Promise<CheckIn | null>
}
