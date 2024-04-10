import { env } from '@/env'
import { prisma } from '@/services/prisma'
import { execSync } from 'child_process'
import { randomUUID } from 'crypto'
import { Environment } from 'vitest'

function generateDatabaseUrl(schema: string) {
  if (!env.DATABASE_URL) {
    throw new Error(
      'Please provide a DATABASE_URL in the environment variables',
    )
  }

  const url = new URL(env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()

    const databaseURL = generateDatabaseUrl(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )
        await prisma.$disconnect()
      },
    }
  },
}
