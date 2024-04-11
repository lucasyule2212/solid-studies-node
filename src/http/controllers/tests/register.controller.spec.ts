import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register Controller (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to register', async () => {
    // ? "request" from "supertest" is a function that mocks the HTTP requests
    // ? By doing so, we can test the HTTP routes without having to run the server
    const response = await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: 'zxczxc',
    })

    expect(response.status).toBe(201)
  })
})
