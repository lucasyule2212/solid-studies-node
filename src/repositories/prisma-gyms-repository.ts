import { prisma } from '@/services/prisma'
import { Gym, Prisma } from '@prisma/client'
import { IGymsRepository } from './interfaces/gyms-repository'

export class PrismaGymsRepository implements IGymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async create(gym: Prisma.GymCreateInput) {
    const createdGym = await prisma.gym.create({
      data: gym,
    })

    return createdGym
  }

  async searchManyByTitle({ query, page }: { query: string; page: number }) {
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      skip: (page - 1) * 20,
      take: 20,
    })

    return gyms
  }

  async findManyNearby({
    latitude,
    longitude,
  }: {
    latitude: number
    longitude: number
  }) {
    const gyms = await prisma.$queryRaw<Gym[]>`
    SELECT * from gyms
    WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 2`

    return gyms
  }
}
