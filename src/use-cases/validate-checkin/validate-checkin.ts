import { ICheckinsRepository } from '@/repositories/interfaces/checkins-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface ValidateCheckinUseCaseRequest {
  checkinId: string
}

interface ValidateCheckinUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckinUseCase {
  constructor(private checkinsRepository: ICheckinsRepository) {}

  public async execute({
    checkinId,
  }: ValidateCheckinUseCaseRequest): Promise<ValidateCheckinUseCaseResponse> {
    const checkIn = await this.checkinsRepository.findById({
      id: checkinId,
    })

    if (!checkIn) {
      throw new ResourceNotFoundError()
    }

    checkIn.validated_at = new Date()

    const savedCheckin = await this.checkinsRepository.save(checkIn)

    return {
      checkIn: savedCheckin,
    }
  }
}
