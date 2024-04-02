import { PrismaCheckinsRepository } from '@/repositories/prisma-checkins-repository'
import { PrismaGymsRepository } from '@/repositories/prisma-gyms-repository'
import { CheckinUseCase } from '../checkin/checkin'

export function makeCheckinUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const gymsRepository = new PrismaGymsRepository()
  const checkinUseCase = new CheckinUseCase(checkinsRepository, gymsRepository)

  return checkinUseCase
}
