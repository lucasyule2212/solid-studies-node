import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { GetUserProfileUseCase } from '../get-user-profile/get-user-profile'

export function makeGetUserProfileUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUserProfileUseCase(prismaUsersRepository)

  return getUserProfileUseCase
}
