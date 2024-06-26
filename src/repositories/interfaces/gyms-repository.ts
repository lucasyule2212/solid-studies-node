import { Gym, Prisma } from '@prisma/client'

export interface IGymsRepository {
  findById(id: string): Promise<Gym | null>
  create(gym: Prisma.GymCreateInput): Promise<Gym>
  searchManyByTitle({
    query,
    page,
  }: {
    query: string
    page: number
  }): Promise<Gym[]>
  findManyNearby({
    latitude,
    longitude,
  }: {
    latitude: number
    longitude: number
  }): Promise<Gym[]>
}
