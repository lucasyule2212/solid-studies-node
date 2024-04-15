import { app } from '@/app'
import { prisma } from '@/services/prisma'
import { userTestLatitude, userTestLongitude } from '@/utils/consts'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Checkin Controller (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a checkin', async () => {
    const { token } = await createAndAuthUser(app)

    const createdGym = await prisma.gym.create({
      data: {
        title: 'Gym Title',
        description: 'Gym Description',
        phone: '123456789',
        latitude: userTestLatitude,
        longitude: userTestLongitude,
      },
    })

    const response = await request(app.server)
      .post(`/gyms/${createdGym.id}/checkins`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        latitude: userTestLatitude,
        longitude: userTestLongitude,
      })

    expect(response.status).toBe(201)
  })
})
