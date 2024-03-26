import { CheckinsInMemoryRepository } from '@/repositories/in-memory/checkins-in-memory-repository'
import { UsersInMemoryRepository } from '@/repositories/in-memory/users-in-memory-repository'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinUseCase } from './checkin'

let usersRepository: UsersInMemoryRepository
let checkinRepository: CheckinsInMemoryRepository
let checkinUseCase: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    usersRepository = new UsersInMemoryRepository()
    checkinRepository = new CheckinsInMemoryRepository()
    checkinUseCase = new CheckinUseCase(checkinRepository, usersRepository)

    // Mock the Date object
    vi.useFakeTimers()
  })

  afterEach(() => {
    // Restore the Date object
    vi.useRealTimers()
  })

  it('Should be able to check in', async () => {
    // Create a check-in
    const { checkIn } = await checkinUseCase.execute({
      userId: 'userid-1',
      gymId: 'gymid-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
  // ! TDD
  // ? Test-Driven Development is an approach to software development where you write tests before writing the code that should make them pass.

  // ? red -> green -> refactor
  // ? red: write a failing test
  // ? green: write the code to make the test pass
  // ? refactor: refactor the code to make it better

  it('Should not be able to check in twice in the same day', async () => {
    // Mock the Date object -> sets a fixed date
    vi.setSystemTime(new Date('2024-03-01T10:00:00'))

    // Create a check-in
    await checkinUseCase.execute({
      userId: 'userid-1',
      gymId: 'gymid-1',
    })

    await expect(
      async () =>
        await checkinUseCase.execute({
          userId: 'userid-1',
          gymId: 'gymid-1',
        }),
    ).rejects.toBeInstanceOf(Error)
  })

  it('Should be able to check in twice but in different days', async () => {
    // Mock the Date object -> sets a fixed date
    vi.setSystemTime(new Date('2024-03-01T10:00:00'))

    // Create a check-in
    await checkinUseCase.execute({
      userId: 'userid-1',
      gymId: 'gymid-1',
    })

    vi.setSystemTime(new Date('2024-03-02T10:00:00'))

    const { checkIn } = await checkinUseCase.execute({
      userId: 'userid-1',
      gymId: 'gymid-1',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
