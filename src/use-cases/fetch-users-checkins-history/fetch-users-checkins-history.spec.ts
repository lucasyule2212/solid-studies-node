import { CheckinsInMemoryRepository } from '@/repositories/in-memory/checkins-in-memory-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchUsersCheckinsHistoryUseCase } from './fetch-users-checkins-history'

let checkinRepository: CheckinsInMemoryRepository
let fetchUsersCheckinsHistoryUseCase: FetchUsersCheckinsHistoryUseCase

describe('Fetch User Checkins History Use Case', () => {
  beforeEach(async () => {
    checkinRepository = new CheckinsInMemoryRepository()
    fetchUsersCheckinsHistoryUseCase = new FetchUsersCheckinsHistoryUseCase(
      checkinRepository,
    )
  })

  it('Should be able to fetch check-in history', async () => {
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

    const { checkIns } = await fetchUsersCheckinsHistoryUseCase.execute({
      userId: 'userid-1',
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gymid-1',
      }),
      expect.objectContaining({
        gym_id: 'gymid-2',
      }),
    ])
  })

  it('Should be able to fetch paginated check-in history', async () => {
    for (let i = 1; i <= 22; i++) {
      await checkinRepository.create({
        gym_id: `gymid-${i}`,
        user_id: 'userid-1',
        validated_at: new Date(),
      })
    }

    const { checkIns } = await fetchUsersCheckinsHistoryUseCase.execute({
      userId: 'userid-1',
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({
        gym_id: 'gymid-21',
      }),
      expect.objectContaining({
        gym_id: 'gymid-22',
      }),
    ])
  })
})
