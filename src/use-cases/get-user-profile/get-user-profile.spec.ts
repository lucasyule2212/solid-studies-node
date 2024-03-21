import { UsersInMemoryRepository } from '@/repositories/in-memory/users-in-memory-repository'
import { hash } from 'bcrypt'
import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: UsersInMemoryRepository
let getUserProfile: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    getUserProfile = new GetUserProfileUseCase(usersRepository)
  })

  it('Should be able to get user profile', async () => {
    // Create a user
    const createdUser = await usersRepository.create({
      email: 'johndoe@example.com',
      name: 'John Doe',
      password_hash: await hash('password', 6),
    })

    // Authenticate user
    const { user } = await getUserProfile.execute({
      id: createdUser.id,
    })

    expect(user.name).toEqual('John Doe')
  })

  it('Should not be able to get user profile with invalid id', async () => {
    await expect(() =>
      getUserProfile.execute({
        id: 'invalid-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
