import { app } from '@/app'
import { prisma } from '@/services/prisma'
import { userTestLatitude, userTestLongitude } from '@/utils/consts'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Checkin History Controller (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list the checkins history', async () => {
    const { token } = await createAndAuthUser(app)

    const user = await prisma.user.findFirstOrThrow()

    const createdGym = await prisma.gym.create({
      data: {
        title: 'Gym Title',
        description: 'Gym Description',
        phone: '123456789',
        latitude: userTestLatitude,
        longitude: userTestLongitude,
      },
    })

    await prisma.checkIn.createMany({
      data: [
        {
          user_id: user.id,
          gym_id: createdGym.id,
        },
        {
          user_id: user.id,
          gym_id: createdGym.id,
        },
      ],
    })

    const response = await request(app.server)
      .get(`/checkins/history`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.checkIns).toEqual([
      expect.objectContaining({
        gym_id: createdGym.id,
        user_id: user.id,
      }),
      expect.objectContaining({
        gym_id: createdGym.id,
        user_id: user.id,
      }),
    ])
  })
})
