import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import { table } from '~/models'
import { env } from '~/env'

const {
	DATABASE_HOST: HOST,
	DATABASE_NAME: NAME,
	DATABASE_PASSWORD: PASSWORD,
	DATABASE_PORT: PORT,
	DATABASE_USERNAME: USERNAME,
} = env

const databaseConnectionString = `postgres://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${NAME}?sslmode=require`

const queryClient = postgres(databaseConnectionString)

export const DatabaseError = postgres.PostgresError
export const db = drizzle(queryClient, { schema: table })
