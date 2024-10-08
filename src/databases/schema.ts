import { sql } from 'drizzle-orm';
import { boolean, integer, pgTable, serial, timestamp, varchar } from 'drizzle-orm/pg-core';

export const token = pgTable('token', {
    token_id: serial('token_id').primaryKey(),
    token: varchar('token', {length: 255}),
    employee: integer('employee').references(() => employee.employee_id, {onUpdate: 'cascade', onDelete: 'cascade'}),
    created_at: timestamp('created_at', {withTimezone: true}).default(sql`now()`),
    expired_at: timestamp('expired_at', {withTimezone: true}).default(sql`now() + interval '1 day'`),
})

export const employee = pgTable('employee', {
    employee_id: serial('employee_id').primaryKey(),
    type: varchar('type', {length: 50}),
    username: varchar('username', {length: 50}),
    password: varchar('password', {length: 255}),
    name: varchar('name', {length: 50}),
    phone: varchar('phone', {length: 20}),
    status: boolean('status').default(false),
})

export const transactions = pgTable('transactions', {
    transaction_id: varchar('transaction_id', {length: 50}).primaryKey(),
    employee: integer('employee').references(() => employee.employee_id, {onUpdate: 'cascade', onDelete: 'cascade'}),
    date: timestamp('date', {withTimezone: true}).default(sql`now()`),
    total: integer('total').default(0),
})

export const detail_transactions = pgTable('detail_transactions', {
    detail_id: serial('detail_id').primaryKey(),
    transaction_id: varchar('transaction_id', {length: 50}).references(() => transactions.transaction_id, {onUpdate: 'cascade', onDelete: 'cascade'}),
    product: varchar('product', {length: 50}).references(() => products.product_id, {onUpdate: 'cascade', onDelete: 'cascade'}),
    quantity: integer('quantity').default(1),
    total: integer('total').default(0),
})

export const products = pgTable('products', {
    product_id: varchar('product_id', {length: 50}).primaryKey(),
    product_name: varchar('product_name', {length: 50}),
    price: integer('price').default(0),
    stock: integer('stock').default(0),
    category: varchar('category', {length: 20}),
    product_image: varchar('product_image', {length: 255}).default('product.png'),
})