import { app } from '@/app'
import { userTestLatitude, userTestLongitude } from '@/utils/consts'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Gym Controller (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to create a gym', async () => {
    const { token } = await createAndAuthUser(app)

    const response = await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Title',
        description: 'Gym Description',
        phone: '123456789',
        latitude: userTestLatitude,
        longitude: userTestLongitude,
      })

    expect(response.status).toBe(201)
  })
})
