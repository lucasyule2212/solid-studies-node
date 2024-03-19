import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'
import { prisma } from '@/services/prisma'
import { hash } from 'bcrypt'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

// ! SOLID
// ? D - Dependency Inversion Principle
// ? High-level modules should not depend on low-level modules. Both should depend on abstractions.

/*
? Instead of explicity instantiating the PrismaUsersRepository (a dependency), we can pass it as a parameter to the registerUseCase function.
 */

export class RegisterUseCase {
  constructor(private usersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    if (userWithSameEmail) {
      throw new Error('Email already exists')
    }

    const prismaUsersRepository = new PrismaUsersRepository()

    await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
