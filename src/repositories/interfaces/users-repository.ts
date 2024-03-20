import { Prisma, User } from '@prisma/client'

export interface IUsersRepository {
  create({ name, email, password_hash }: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
}
