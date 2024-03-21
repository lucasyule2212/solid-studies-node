import { UsersInMemoryRepository } from '@/repositories/in-memory/users-in-memory-repository'
import { compare } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import { EmailAlreadyExistsError } from '../errors/email-already-exists-error'
import { RegisterUseCase } from './register'

let usersRepository: UsersInMemoryRepository
let registerUseCase: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    registerUseCase = new RegisterUseCase(usersRepository)
  })

  it('Should be able to register', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('Should hash user password upon registration', async () => {
    const { user } = await registerUseCase.execute({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'password',
    })

    const isPasswordHashValid = await compare('password', user.password_hash)

    expect(isPasswordHashValid).toBe(true)
  })

  it('Should not be able to register with same email twice', async () => {
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
