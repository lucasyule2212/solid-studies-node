import { CheckinsInMemoryRepository } from '@/repositories/in-memory/checkins-in-memory-repository'
import { UsersInMemoryRepository } from '@/repositories/in-memory/users-in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CheckinUseCase } from './checkin'

let usersRepository: UsersInMemoryRepository
let checkinRepository: CheckinsInMemoryRepository
let checkinUseCase: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    checkinRepository = new CheckinsInMemoryRepository()
    checkinUseCase = new CheckinUseCase(checkinRepository, usersRepository)
  })

  it('Should be able to check in', async () => {
    // Create a check-in
    const { checkIn } = await checkinUseCase.execute({
      userId: 'userid-1',
      gymId: 'gymid-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
