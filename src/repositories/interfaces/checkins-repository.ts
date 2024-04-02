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
  findManyByUserId({
    user_id,
    page,
  }: {
    user_id: string
    page: number
  }): Promise<CheckIn[]>
  countByUserId({ user_id }: { user_id: string }): Promise<number>
  findById({ id }: { id: string }): Promise<CheckIn | null>
  save(checkIn: CheckIn): Promise<CheckIn>
}
