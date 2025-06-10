import { pgTable, text, timestamp } from 'drizzle-orm/pg-core'
import { users } from './users'

export const threads = pgTable('threads', {
	id: text('id')
		.primaryKey(),
	userId: text('user_id')
		.references(() => users.id, { onDelete: 'cascade' })
		.notNull(),
	createdAt: timestamp('created_at')
		.notNull()
		.defaultNow(),
	updatedAt: timestamp('updated_at')
		.notNull()
		.defaultNow(),
})
