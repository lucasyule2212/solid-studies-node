import { ICheckinsRepository } from '@/repositories/interfaces/checkins-repository'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { LateCheckinValidationError } from '../errors/late-checkin-validation-error'

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

    // Check if the check-in is expired
    // ? Method diff is used to compare a most recent date with an older date
    const distanceInMinutesFromCheckinCreation = dayjs(new Date()).diff(
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckinCreation > 20) {
      throw new LateCheckinValidationError()
    }

    checkIn.validated_at = new Date()

    const savedCheckin = await this.checkinsRepository.save(checkIn)

    return {
      checkIn: savedCheckin,
    }
  }
}
