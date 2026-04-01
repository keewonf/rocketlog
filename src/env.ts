import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.url({ error: "DATABASE_URL inválida" }),
  JWT_SECRET: z.string({ error: "JWT_SECRET é obrigatório" }).min(1),
});

export const env = envSchema.parse(process.env);
