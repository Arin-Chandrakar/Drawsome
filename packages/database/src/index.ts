import { PrismaClient } from "./generated/prisma/client";

export const prismaClient = new PrismaClient({
    adapter:{url:process.env.DATABASE_URL}
});