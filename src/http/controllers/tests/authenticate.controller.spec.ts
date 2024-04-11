import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate Controller (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to authenticate', async () => {
    // create the user
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'zxczxc',
    })

    const response = await request(app.server).post('/sessions').send({
      email: 'johndoe@example.com',
      password: 'zxczxc',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
  })
})
