import { CheckinsInMemoryRepository } from '@/repositories/in-memory/checkins-in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { GetUserMetricsUseCase } from './get-user-metrics'

let checkinRepository: CheckinsInMemoryRepository
let getUserMetricsUseCase: GetUserMetricsUseCase

describe('Get User Metrics Use Case', () => {
  beforeEach(async () => {
    checkinRepository = new CheckinsInMemoryRepository()
    getUserMetricsUseCase = new GetUserMetricsUseCase(checkinRepository)

    await checkinRepository.create({
      gym_id: 'gymid-1',
      user_id: 'userid-1',
      validated_at: new Date(),
    })
    await checkinRepository.create({
      gym_id: 'gymid-2',
      user_id: 'userid-1',
      validated_at: new Date(),
    })
  })

  it('Should be able to get check-ins count from metrics', async () => {
    const { checkInsCount } = await getUserMetricsUseCase.execute({
      userId: 'userid-1',
    })

    expect(checkInsCount).toEqual(2)
  })
})
