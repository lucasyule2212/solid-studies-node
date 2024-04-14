import { app } from '@/app'
import { createAndAuthUser } from '@/utils/test/create-and-auth-user'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Profile Controller (e2e)', async () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('Should be able to get signed-in user profile', async () => {
    const { token } = await createAndAuthUser(app)

    const profileResponse = await request(app.server)
      .get('/me')
      .set('Authorization', `Bearer ${token}`)

    expect(profileResponse.status).toBe(200)
    expect(profileResponse.body.user).toEqual(
      expect.objectContaining({
        email: 'johndoe@example.com',
      }),
    )
  })
})
