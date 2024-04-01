import { ICheckinsRepository } from '@/repositories/interfaces/checkins-repository'
import { IGymsRepository } from '@/repositories/interfaces/gyms-repository'
import { MAX_DISTANCE_IN_KILOMETERS } from '@/utils/consts'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'
import { MaxDistanceError } from '../errors/max-distance-error'
import { MaxNumberOfCheckinsError } from '../errors/max-number-of-checkins-error'

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
    userLatitude,
    userLongitude,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gym) {
      throw new ResourceNotFoundError()
    }

    const distance = getDistanceBetweenCoordinates({
      from: {
        latitude: userLatitude,
        longitude: userLongitude,
      },
      to: {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    })

    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw new MaxDistanceError()
    }

    const checkInOnSameDate = await this.checkinsRepository.findByUserIdOnDate({
      user_id: userId,
      date: new Date(),
    })

    if (checkInOnSameDate) {
      throw new MaxNumberOfCheckinsError()
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
