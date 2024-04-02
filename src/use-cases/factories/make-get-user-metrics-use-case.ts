import { PrismaCheckinsRepository } from '@/repositories/prisma-checkins-repository'
import { GetUserMetricsUseCase } from '../get-user-metrics/get-user-metrics'

export function makeGetUserMetricsUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const getUserMetricsUseCase = new GetUserMetricsUseCase(checkinsRepository)

  return getUserMetricsUseCase
}
