import { PrismaClient } from "@prisma/client";

/*This is a fix for this issue https://github.com/prisma/prisma/issues/20691 which caused prisma to give an error in dvelopment*/

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma: PrismaClient =
  typeof window === "undefined"
    ? globalForPrisma.prisma ?? new PrismaClient()
    : (undefined as unknown as PrismaClient);

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
