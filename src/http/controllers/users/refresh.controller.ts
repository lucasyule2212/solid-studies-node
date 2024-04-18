import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  // ? Check if the refreshToken exists in the request cookies
  await request.jwtVerify({ onlyCookie: true })

  const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    { sign: { sub: request.user.sub } },
  )
  const refreshToken = await reply.jwtSign(
    { role },
    { sign: { sub: request.user.sub, expiresIn: '7d' } },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/', // ? This enables the cookie to be accessible from all routes
      secure: true, // ? This ensures that the cookie is only sent over HTTPS (secure)
      sameSite: true, // ? This prevents the cookie from being sent in cross-site requests
      httpOnly: true, // ? This prevents the cookie from being accessed via client/browser
    })
    .status(200)
    .send({ token })
}
