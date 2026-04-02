import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { z } from "zod";

const paramsSchema = z.object({
  id: z.uuid(),
});
const bodySchema = z.object({
  status: z.enum(["processing", "shipped", "delivered"]),
});

class DeliveriesStatusController {
  async update(request: Request, response: Response) {
    const { id } = paramsSchema.parse(request.params);

    const deliveryExists = await prisma.delivery.findUnique({
      where: { id },
    });
    if (!deliveryExists) {
      throw new AppError("Delivery not found", 404);
    }

    const { status } = bodySchema.parse(request.body);

    await prisma.delivery.update({
      data: {
        status,
      },
      where: {
        id,
      },
    });

    return response.json();
  }
}

export { DeliveriesStatusController };
