import { app } from '@/app'
import { prisma } from '@/services/prisma'
import { userTestLatitude, userTestLongitude } from '@/utils/consts'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Validate Checkin Controller (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to validate a checkin', async () => {
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

    let createdCheckin = await prisma.checkIn.create({
      data: {
        user_id: user.id,
        gym_id: createdGym.id,
      },
    })

    const response = await request(app.server)
      .patch(`/checkins/${createdCheckin.id}/validate`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(204)

    createdCheckin = await prisma.checkIn.findUniqueOrThrow({
      where: {
        id: createdCheckin.id,
      },
    })

    expect(createdCheckin.validated_at).toEqual(expect.any(Date))
  })
})
