import { CheckinsInMemoryRepository } from '@/repositories/in-memory/checkins-in-memory-repository'
import { GymsInMemoryRepository } from '@/repositories/in-memory/gyms-in-memory-repository'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinUseCase } from './checkin'

let gymsRepository: GymsInMemoryRepository
let checkinRepository: CheckinsInMemoryRepository
let checkinUseCase: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    gymsRepository = new GymsInMemoryRepository()
    checkinRepository = new CheckinsInMemoryRepository()
    checkinUseCase = new CheckinUseCase(checkinRepository, gymsRepository)

    gymsRepository.gyms.push({
      id: 'gymid-1',
      title: 'Gym 1',
      description: 'Description',
      phone: '123456789',
      latitude: new Decimal(0),
      longitude: new Decimal(0),
    })

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
      userLatitude: 0,
      userLongitude: 0,
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
      userLatitude: 0,
      userLongitude: 0,
    })

    await expect(
      async () =>
        await checkinUseCase.execute({
          userId: 'userid-1',
          gymId: 'gymid-1',
          userLatitude: 0,
          userLongitude: 0,
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
      userLatitude: 0,
      userLongitude: 0,
    })

    vi.setSystemTime(new Date('2024-03-02T10:00:00'))

    const { checkIn } = await checkinUseCase.execute({
      userId: 'userid-1',
      gymId: 'gymid-1',
      userLatitude: 0,
      userLongitude: 0,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
