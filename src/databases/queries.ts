import { eq, ilike } from 'drizzle-orm';
import { client, db } from './connection';
import * as table from './schema';

client.connect();

export const signIn = async (token: string, employee: number) => {
    return await db.insert(table.token).values({
        token: token,
        employee: employee
    });
}

export const signOut = async (token: string) => {
    return await db.delete(table.token).where(eq(table.token.token, token));
}

export const getToken = async (token: string) => {
    return await db.select({employee_id: table.token.employee}).from(table.token).where(eq(table.token.token, token));
}

export const getEmployee = async (username: string) => {
    return await db.select().from(table.employee).where(eq(table.employee.username, username));
}

export const searchProduct = async (search: string) => {
    return await db.select().from(table.products).where(ilike(table.products.product_name, `%${search}%`));
}

export const createTransaction = async (transaction_id: string, employee_id: number, total: number) => {
    return await db.insert(table.transactions).values({
        transaction_id: transaction_id,
        employee: employee_id,
        total: total,
    }).returning({transaction_id: table.transactions.transaction_id});
}

export const createDetailTransaction = async (transaction_id: string, product_id: string, quantity: number, total: number) => {
    return await db.insert(table.detail_transactions).values({
        transaction_id: transaction_id,
        product: product_id,
        quantity: quantity,
        total: total,
    });
}