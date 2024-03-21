import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { RegisterUseCase } from '../register/register'

// ? Factory Pattern:
/*
?   The Factory Patter is used to centralize the creation of objects in a single place.
?   In this case we are centralizing the dependencies of the creation of a RegisterUseCase.
*/

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(prismaUsersRepository)

  return registerUseCase
}
