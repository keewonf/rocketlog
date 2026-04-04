import { env } from "@/env";
import { PrismaClient } from "../generated/prisma";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// Use the PostgreSQL adapter so Prisma can connect through a single env-driven URL.
const adapter = new PrismaPg({
  connectionString: env.DATABASE_URL!,
});

export const prisma = new PrismaClient({
  adapter,
  log: ["query"],
});
