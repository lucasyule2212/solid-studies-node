import { UsersInMemoryRepository } from '@/repositories/in-memory/users-in-memory-repository'
import { hash } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate'

let usersRepository: UsersInMemoryRepository
let authenticateUseCase: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    authenticateUseCase = new AuthenticateUseCase(usersRepository)
  })

  it('Should be able to authenticate', async () => {
    // Create a user
    await usersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('password', 6),
    })

    // Authenticate user
    const { user } = await authenticateUseCase.execute({
      email: 'johndoe@example.com',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should not be able to authenticate with wrong email', async () => {
    // Authenticate user
    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    // Create a user
    await usersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('password', 6),
    })

    // Authenticate user
    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: 'password123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
