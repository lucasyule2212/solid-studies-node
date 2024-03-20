import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { appRoutes } from './http/routes'

export const app = fastify()

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    // ? 400 - because this is a validation error
    return reply
      .status(400)
      .send({ message: 'Validation error', issues: error.format() })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // TODO - log error to a service like Sentry, DataDog, etc...
  }

  // ? 500 - because this is an unexpected error
  return reply.status(500).send({ message: 'Internal server error' })
})
