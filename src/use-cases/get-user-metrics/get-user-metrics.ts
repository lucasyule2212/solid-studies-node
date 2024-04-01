import { ICheckinsRepository } from '@/repositories/interfaces/checkins-repository'

interface GetUserMetricsUseCaseRequest {
  userId: string
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetUserMetricsUseCase {
  constructor(private checkinsRepository: ICheckinsRepository) {}

  public async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkinsRepository.countByUserId({
      user_id: userId,
    })

    return {
      checkInsCount,
    }
  }
}
