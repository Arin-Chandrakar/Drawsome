import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neon } from "@neondatabase/serverless"
import { Prisma } from "@prisma/client/extension";

// const sql=neon(process.env.DATABASE_URL!);
const adapter=new PrismaNeon({connectionString:process.env.DATABASE_URL});

// export const prisma = new PrismaClient({
//     adapter
// });

export const prisma = new PrismaClient({adapter});