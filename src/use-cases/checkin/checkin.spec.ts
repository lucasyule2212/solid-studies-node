import { CheckinsInMemoryRepository } from '@/repositories/in-memory/checkins-in-memory-repository'
import { GymsInMemoryRepository } from '@/repositories/in-memory/gyms-in-memory-repository'
import {
  furtherGymLatitude,
  furtherGymLongitude,
  userTestLatitude,
  userTestLongitude,
} from '@/utils/consts'
import { Decimal } from '@prisma/client/runtime/library'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { CheckinUseCase } from './checkin'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckinsError } from '../errors/max-number-of-checkins-error'

let gymsRepository: GymsInMemoryRepository
let checkinRepository: CheckinsInMemoryRepository
let checkinUseCase: CheckinUseCase

describe('Check-in Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new GymsInMemoryRepository()
    checkinRepository = new CheckinsInMemoryRepository()
    checkinUseCase = new CheckinUseCase(checkinRepository, gymsRepository)

    await gymsRepository.create({
      id: 'gymid-1',
      title: 'Academia Teste',
      description: 'Uma academia de teste',
      phone: '123456789',
      latitude: userTestLatitude,
      longitude: userTestLongitude,
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
      userLatitude: userTestLatitude,
      userLongitude: userTestLongitude,
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
      userLatitude: userTestLatitude,
      userLongitude: userTestLongitude,
    })

    await expect(
      async () =>
        await checkinUseCase.execute({
          userId: 'userid-1',
          gymId: 'gymid-1',
          userLatitude: userTestLatitude,
          userLongitude: userTestLongitude,
        }),
    ).rejects.toBeInstanceOf(MaxNumberOfCheckinsError)
  })

  it('Should be able to check in twice but in different days', async () => {
    // Mock the Date object -> sets a fixed date
    vi.setSystemTime(new Date('2024-03-01T10:00:00'))

    // Create a check-in
    await checkinUseCase.execute({
      userId: 'userid-1',
      gymId: 'gymid-1',
      userLatitude: userTestLatitude,
      userLongitude: userTestLongitude,
    })

    vi.setSystemTime(new Date('2024-03-02T10:00:00'))

    const { checkIn } = await checkinUseCase.execute({
      userId: 'userid-1',
      gymId: 'gymid-1',
      userLatitude: userTestLatitude,
      userLongitude: userTestLongitude,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('Should not be able to check in on distant gym', async () => {
    gymsRepository.gyms.push({
      id: 'gymid-2',
      title: 'Gym 2',
      description: 'Description 2',
      phone: '223456789',
      latitude: new Decimal(furtherGymLatitude),
      longitude: new Decimal(furtherGymLongitude),
    })

    // Create a check-in
    await expect(() =>
      checkinUseCase.execute({
        userId: 'userid-1',
        gymId: 'gymid-2',
        userLatitude: userTestLatitude,
        userLongitude: userTestLongitude,
      }),
    ).rejects.toBeInstanceOf(MaxDistanceError)
  })
})
