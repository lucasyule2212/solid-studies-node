import { PrismaCheckinsRepository } from '@/repositories/prisma-checkins-repository'
import { ValidateCheckinUseCase } from '../validate-checkin/validate-checkin'

export function makeValidateCheckinUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const validateCheckinUseCase = new ValidateCheckinUseCase(checkinsRepository)

  return validateCheckinUseCase
}
