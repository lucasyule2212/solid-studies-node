import { IUsersRepository } from '@/repositories/interfaces/users-repository'
import { User } from '@prisma/client'
import { compare } from 'bcrypt'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const isPasswordHashValid = await compare(password, user.password_hash)

    if (!isPasswordHashValid) {
      throw new InvalidCredentialsError()
    }

    return { user }
  }
}
