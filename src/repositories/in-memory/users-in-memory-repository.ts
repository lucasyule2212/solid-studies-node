import { Prisma, User } from '@prisma/client'
import { IUsersRepository } from './../interfaces/users-repository'

export class UsersInMemoryRepository implements IUsersRepository {
  public users: User[] = []
  async create({ name, email, password_hash }: Prisma.UserCreateInput) {
    const user = {
      id: 'user-1',
      name,
      email,
      password_hash,
      created_at: new Date(),
    }

    this.users.push(user)

    return user
  }

  async findByEmail(email: string) {
    return this.users.find((user) => user.email === email) || null
  }
}
