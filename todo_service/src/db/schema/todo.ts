import {
    pgTable,
    uuid,
    varchar,
    boolean,
    timestamp,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const todos = pgTable('todos', {
    id: uuid('id')
        .primaryKey()
        .default(sql`gen_random_uuid()`),

    title: varchar('title', { length: 255 }).notNull(),

    description: varchar('description', { length: 1000 }).notNull(),

    completed: boolean('completed').notNull().default(false),

    createdAt: timestamp('created_at').notNull().defaultNow(),

    updatedAt: timestamp('updated_at')
        .notNull()
        .defaultNow()
        .$onUpdate(() => new Date()), // Automatically updates the timestamp on save

    deletedAt: timestamp('deleted_at'),
});
