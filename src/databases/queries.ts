import { eq } from 'drizzle-orm';
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

export const getEmployee = async (username: string) => {
    return await db.select().from(table.employee).where(eq(table.employee.username, username));
}