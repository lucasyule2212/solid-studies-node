import { CheckIn, Prisma } from '@prisma/client'

export interface ICheckinsRepository {
  create({
    gym_id,
    user_id,
  }: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}
