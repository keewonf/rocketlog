import { z } from "zod";

// Validate required variables at startup to fail fast on invalid config.
const envSchema = z.object({
  DATABASE_URL: z.url({ error: "Invalid DATABASE_URL" }),
  POSTGRES_USER: z.string({ error: "POSTGRES_USER is required" }).min(1),
  POSTGRES_PASSWORD: z
    .string({ error: "POSTGRES_PASSWORD is required" })
    .min(1),
  POSTGRES_DB: z.string({ error: "POSTGRES_DB is required" }).min(1),
  JWT_SECRET: z.string({ error: "JWT_SECRET is required" }).min(1),
  PORT: z.coerce.number().default(3333),
});

export const env = envSchema.parse(process.env);
