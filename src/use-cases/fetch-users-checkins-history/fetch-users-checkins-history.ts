import { ICheckinsRepository } from '@/repositories/interfaces/checkins-repository'
import { CheckIn } from '@prisma/client'

interface FetchUsersCheckinsHistoryUseCaseRequest {
  userId: string
  page?: number
}

interface FetchUsersCheckinsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUsersCheckinsHistoryUseCase {
  constructor(private checkinsRepository: ICheckinsRepository) {}

  public async execute({
    userId,
    page = 1,
  }: FetchUsersCheckinsHistoryUseCaseRequest): Promise<FetchUsersCheckinsHistoryUseCaseResponse> {
    const checkIns = await this.checkinsRepository.findManyByUserId({
      user_id: userId,
      page,
    })

    return {
      checkIns,
    }
  }
}
