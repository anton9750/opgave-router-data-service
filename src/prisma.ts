import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import "dotenv/config";

// Prisma 7 requires initializing the driver adapter using a configuration 
// object with a structured 'url' string parameter to comply with type safety.
const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL ?? "file:./dev.db"
});

// Create and export your central, fully type-safe client instance
export const prisma = new PrismaClient({ adapter });