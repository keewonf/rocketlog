import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
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
    const { name, email, password, role } = bodySchema.parse(request.body);

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } });

    if (userWithSameEmail) {
      throw new AppError("User with same email already exists");
    }

    const hashedPassword = await hash(password, 8);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return response.status(201).json(userWithoutPassword);
  }
}

export { UsersController };
