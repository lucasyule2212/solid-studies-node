import { IGymsRepository } from '@/repositories/interfaces/gyms-repository'
import { Gym } from '@prisma/client'

interface SearchGymUseCaseRequest {
  query: string
  page?: number
}

interface SearchGymUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymUseCase {
  constructor(private gymsRepository: IGymsRepository) {}

  async execute({
    query,
    page = 1,
  }: SearchGymUseCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchManyByTitle({ query, page })

    return { gyms }
  }
}
