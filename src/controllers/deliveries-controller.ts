import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { z } from "zod";

const bodySchema = z.object({
  user_id: z.uuid(),
  description: z.string().min(6, "A descrição deve ter no mínimo 6 caracteres"),
});

class DeliveriesController {
  async create(request: Request, response: Response) {
    const { user_id, description } = bodySchema.parse(request.body);

    const userExists = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!userExists) {
      throw new AppError("User not found", 404);
    }

    const delivery = await prisma.delivery.create({
      data: {
        description,
        userId: user_id,
      },
    });

    return response.status(201).json(delivery);
  }

  async index(request: Request, response: Response) {
    const deliveries = await prisma.delivery.findMany({
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    });
    return response.json(deliveries);
  }
}

export { DeliveriesController };
