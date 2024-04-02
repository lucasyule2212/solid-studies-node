import { GymsInMemoryRepository } from '@/repositories/in-memory/gyms-in-memory-repository'
import { userTestLatitude, userTestLongitude } from '@/utils/consts'
import { beforeEach, describe, expect, it } from 'vitest'
import { SearchGymUseCase } from './search-gym'

let gymsRepository: GymsInMemoryRepository
let searchGymUseCase: SearchGymUseCase

describe('Search gym Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new GymsInMemoryRepository()
    searchGymUseCase = new SearchGymUseCase(gymsRepository)
  })

  it('Should be able to search for gyms', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `gymid-${i}`,
        latitude: userTestLatitude,
        longitude: userTestLongitude,
      })
    }

    const { gyms } = await searchGymUseCase.execute({
      query: 'gym',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({
        title: 'gymid-21',
      }),
      expect.objectContaining({
        title: 'gymid-22',
      }),
    ])
  })
})
