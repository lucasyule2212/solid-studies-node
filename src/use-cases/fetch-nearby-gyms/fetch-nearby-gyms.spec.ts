import { GymsInMemoryRepository } from '@/repositories/in-memory/gyms-in-memory-repository'
import {
  furtherGymLatitude,
  furtherGymLongitude,
  userTestLatitude,
  userTestLongitude,
} from '@/utils/consts'
import { beforeEach, describe, expect, it } from 'vitest'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: GymsInMemoryRepository
let fetchNearbyGymsUseCase: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new GymsInMemoryRepository()
    fetchNearbyGymsUseCase = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('Should be able to fetch nearby gyms', async () => {
    await gymsRepository.create({
      title: 'Far Gym',
      latitude: -8.1191382, // arbitrary far latitude
      longitude: -34.942052, // arbitrary far longitude
    })

    await gymsRepository.create({
      title: 'Near Gym',
      latitude: furtherGymLatitude, // this furtherGymLatitude is used from the checkin validation
      longitude: furtherGymLongitude, // so it is closer than 2km
    })

    const { gyms } = await fetchNearbyGymsUseCase.execute({
      userLatitude: userTestLatitude,
      userLongitude: userTestLongitude,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Near Gym' })])
  })
})
