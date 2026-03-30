import { Request, Response, NextFunction } from "express";
import { hash } from "bcrypt";
import { z } from "zod";
import { AppError } from "@/utils/AppError";

const bodySchema = z.object({
  name: z.string().trim().min(1),
  email: z.email().trim(),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  role: z.enum(["customer", "sale"]).optional(),
});

class UsersController {
  async create(request: Request, response: Response) {
    const { name, email, password } = bodySchema.parse(request.body);

    const hashedPassword = await hash(password, 8);

    return response.json({ message: "Criado com sucesso" });
  }
}

export { UsersController };
