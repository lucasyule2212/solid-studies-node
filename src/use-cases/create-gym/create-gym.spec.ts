import { GymsInMemoryRepository } from '@/repositories/in-memory/gyms-in-memory-repository'
import { userTestLatitude, userTestLongitude } from '@/utils/consts'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateGymUseCase } from './create-gym'

let gymsRepository: GymsInMemoryRepository
let createGymUseCase: CreateGymUseCase

describe('Create gym Use Case', () => {
  beforeEach(() => {
    gymsRepository = new GymsInMemoryRepository()
    createGymUseCase = new CreateGymUseCase(gymsRepository)
  })

  it('Should be able to create a gym', async () => {
    const { gym } = await createGymUseCase.execute({
      title: 'Academia Teste',
      description: 'Uma academia de teste',
      phone: '123456789',
      latitude: userTestLatitude,
      longitude: userTestLongitude,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
