import { ICheckinsRepository } from '@/repositories/interfaces/checkins-repository'
import { IUsersRepository } from '@/repositories/interfaces/users-repository'
import { CheckIn } from '@prisma/client'

interface CheckinUseCaseRequest {
  userId: string
  gymId: string
}

interface CheckinUseCaseResponse {
  checkIn: CheckIn
}

export class CheckinUseCase {
  constructor(
    private checkinsRepository: ICheckinsRepository,
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    userId,
    gymId,
  }: CheckinUseCaseRequest): Promise<CheckinUseCaseResponse> {
    // const user = await this.usersRepository.findById(userId)

    // if (!user) {
    //   throw new Error('User not found')
    // }

    const checkIn = await this.checkinsRepository.create({
      gym_id: gymId,
      user_id: userId,
    })

    return {
      checkIn,
    }
  }
}
