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

describe('Search Gyms Controller (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to search for a gym', async () => {
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
        latitude: furtherGymLatitude,
        longitude: furtherGymLongitude,
      })

    const response = await request(app.server)
      .get('/gyms/search')
      .query({
        query: 'Typescript',
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.gyms).toHaveLength(1)
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Gym Typescript',
      }),
    ])
  })
})
