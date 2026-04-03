import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { z } from "zod";

const bodySchema = z.object({
  delivery_id: z.uuid(),
  description: z.string().min(6, "A descrição deve ter no mínimo 6 caracteres"),
});
const paramsSchema = z.object({
  delivery_id: z.uuid(),
});

class DeliveryLogsController {
  async create(request: Request, response: Response) {
    const { delivery_id, description } = bodySchema.parse(request.body);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
    });

    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }

    if (delivery.status === "processing") {
      throw new AppError("change status to shipped", 404);
    }

    const deliveryLog = await prisma.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description,
      },
    });

    return response.status(201).json(deliveryLog);
  }

  async show(request: Request, response: Response) {
    const { delivery_id } = paramsSchema.parse(request.params);

    const delivery = await prisma.delivery.findUnique({
      where: {
        id: delivery_id,
      },
      include: {
        user: {
          select: { name: true, email: true },
        },
        logs: true,
      },
    });
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (request.user.id !== delivery?.userId && request.user.role !== "sale") {
      throw new AppError("Unauthorized", 401);
    }

    if (!delivery) {
      throw new AppError("Delivery not found", 404);
    }

    return response.json(delivery);
  }
}

export { DeliveryLogsController };
