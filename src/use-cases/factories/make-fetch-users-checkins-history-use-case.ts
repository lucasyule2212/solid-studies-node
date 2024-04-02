import { PrismaCheckinsRepository } from '@/repositories/prisma-checkins-repository'
import { FetchUsersCheckinsHistoryUseCase } from '../fetch-users-checkins-history/fetch-users-checkins-history'

export function makeFetchUsersCheckinsUseCase() {
  const checkinsRepository = new PrismaCheckinsRepository()
  const fetchUsersCheckinsUseCase = new FetchUsersCheckinsHistoryUseCase(
    checkinsRepository,
  )

  return fetchUsersCheckinsUseCase
}
