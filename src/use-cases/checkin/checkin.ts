import { ICheckinsRepository } from '@/repositories/interfaces/checkins-repository'
import { IGymsRepository } from '@/repositories/interfaces/gyms-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
  userLatitude: number
  userLongitude: number
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

export class CheckinUseCase {
  constructor(
    private checkinsRepository: ICheckinsRepository,
    private gymsRepository: IGymsRepository,
  ) {}

  public async execute({
    userId,
    gymId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const checkInOnSameDate = await this.checkinsRepository.findByUserIdOnDate({
      user_id: userId,
      date: new Date(),
    })

    if (checkInOnSameDate) {
      throw new Error()
    }

    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
