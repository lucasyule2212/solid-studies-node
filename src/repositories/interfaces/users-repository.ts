import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User>
}
