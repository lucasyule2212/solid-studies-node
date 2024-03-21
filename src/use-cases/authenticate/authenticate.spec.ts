import { UsersInMemoryRepository } from '@/repositories/in-memory/users-in-memory-repository'
import { hash } from 'bcrypt'
import { describe, expect, it } from 'vitest'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'
import { AuthenticateUseCase } from './authenticate'

describe('Authenticate Use Case', () => {
  it('Should be able to authenticate', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

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
    const usersRepository = new UsersInMemoryRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

    // Authenticate user
    await expect(() =>
      authenticateUseCase.execute({
        email: 'johndoe@example.com',
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('Should not be able to authenticate with wrong password', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const authenticateUseCase = new AuthenticateUseCase(usersRepository)

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
