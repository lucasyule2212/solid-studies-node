import { Gym } from '@prisma/client'
import { IGymsRepository } from '../interfaces/gyms-repository'

export class GymsInMemoryRepository implements IGymsRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) || null
  }
}
