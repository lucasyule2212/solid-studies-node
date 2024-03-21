import { UsersInMemoryRepository } from '@/repositories/in-memory/users-in-memory-repository'
import { compare } from 'bcrypt'
import { describe, expect, it } from 'vitest'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error'
import { RegisterUseCase } from './register'

describe('Register Use Case', () => {
  it('Should be able to register', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    })

    const isPasswordHashValid = await compare('password', user.password_hash)

    expect(isPasswordHashValid).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
    const usersRepository = new UsersInMemoryRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const email = 'johndoe@example.com'

    await registerUseCase.execute({
      name: 'John Doe',
      email,
      password: 'password',
    })

    await expect(() =>
      registerUseCase.execute({
        name: 'John Doe',
        email,
        password: 'password',
      }),
    ).rejects.toBeInstanceOf(EmailAlreadyExistsError)
  })
})
