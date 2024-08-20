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

export const getProducts = async () => {
    return await db.select().from(table.products);
}

export const getProduct = async (product_id: string) => {
    return await db.select().from(table.products).where(eq(table.products.product_id, product_id));
}

export const getProductsByCategory = async (category: string) => {
    return await db.select().from(table.products).where(eq(table.products.category, category));
}

export const addProduct = async (product_id: string, product_name: string, stock: number, price: number, category: string, product_image: string) => {
    return await db.insert(table.products).values({
        product_id: product_id,
        product_name: product_name,
        stock: stock,
        price: price,
        category: category,
        product_image: product_image
    });
}

export const updateProduct = async (product_id: string, product_name: string, stock: number, price: number, category: string) => {
    return await db.update(table.products).set({
        product_name: product_name,
        stock: stock,
        price: price,
        category: category
    }).where(eq(table.products.product_id, product_id));
}

export const deleteProduct = async (product_id: string) => {
    return await db.delete(table.products).where(eq(table.products.product_id, product_id));
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