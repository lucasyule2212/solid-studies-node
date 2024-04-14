import { app } from '@/app'
import {
  furtherGymLatitude,
  furtherGymLongitude,
  userTestLatitude,
  userTestLongitude,
} from '@/utils/consts'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Nearby Gyms Controller (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthUser(app)

    // creating some gyms
    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Javascript',
        description: 'Gym Description',
        phone: '123456789',
        latitude: userTestLatitude,
        longitude: userTestLongitude,
      })

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Gym Typescript',
        description: 'Gym Description 2',
        phone: '123456788',
        latitude: -8.1191382, // arbitrary far latitude
        longitude: -34.942052, // arbitrary far longitude
      })

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: userTestLatitude,
        longitude: userTestLongitude,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym Javascript',
      }),
    ])
  })
})
