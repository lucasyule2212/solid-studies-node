import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { IGymsRepository } from '../interfaces/gyms-repository'

export class GymsInMemoryRepository implements IGymsRepository {
  public gyms: Gym[] = []

  async findById(id: string) {
    return this.gyms.find((gym) => gym.id === id) || null
  }

  async create({
    id,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: Prisma.GymCreateInput) {
    const gym = {
      id: id ?? randomUUID(),
      title,
      description: description ?? null,
      phone: phone ?? null,
      latitude: new Prisma.Decimal(latitude.toString()),
      longitude: new Prisma.Decimal(longitude.toString()),
      created_at: new Date(),
    }

    this.gyms.push(gym)

    return gym
  }

  async searchManyByTitle({ query, page }: { query: string; page: number }) {
    return this.gyms
      .filter((gym) => gym.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }
}
