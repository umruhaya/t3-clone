import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const users = pgTable('users', {
	id: text('id')
		.primaryKey(),
	name: text('name'),
	email: text('email')
		.notNull(),
	authProvider: text('auth_provider', { enum: ['google'] }),
	createdAt: timestamp('created_at')
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.defaultNow(),
})
