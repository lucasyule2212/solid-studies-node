import { UsersRepository } from '@/repositories/interfaces/users-repository'
import { EmailAlreadyExistsError } from '@/use-cases/errors/email-already-exists-error'
import { User } from '@prisma/client'
import { hash } from 'bcrypt'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}

// ! SOLID
// ? D - Dependency Inversion Principle
// ? High-level modules should not depend on low-level modules. Both should depend on abstractions.

/*
? Instead of explicity instantiating the PrismaUsersRepository (a dependency), we can pass it as a parameter to the registerUseCase function.
 */

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new EmailAlreadyExistsError()
    }

    const user = await this.usersRepository.create({
      name,
      email,
      password_hash,
    })
    return { user }
  }
}
