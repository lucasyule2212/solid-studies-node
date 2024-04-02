import { CheckinsInMemoryRepository } from '@/repositories/in-memory/checkins-in-memory-repository'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { ValidateCheckinUseCase } from './validate-checkin'

let checkinRepository: CheckinsInMemoryRepository
let validateCheckinUseCase: ValidateCheckinUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkinRepository = new CheckinsInMemoryRepository()
    validateCheckinUseCase = new ValidateCheckinUseCase(checkinRepository)

    // Mock the Date object
    // vi.useFakeTimers()
  })

  afterEach(() => {
    // Restore the Date object
    // vi.useRealTimers()
  })

  it('Should be able to validate the check-in', async () => {
    const checkIn = await checkinRepository.create({
      gym_id: 'gymid-1',
      user_id: 'userid-1',
    })

    // Validate a check-in
    const { checkIn: validatedCheckin } = await validateCheckinUseCase.execute({
      checkinId: checkIn.id,
    })

    expect(validatedCheckin.validated_at).toEqual(expect.any(Date))
    expect(checkinRepository.checkIns[0].validated_at).toEqual(expect.any(Date))
  })

  it('Should not be able to validate an inexistent check-in', async () => {
    await expect(
      validateCheckinUseCase.execute({
        checkinId: 'inexistent-checkin-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
