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
type DeliveryStatus = z.infer<typeof bodySchema>["status"];

const statusLabelPtBr: Record<DeliveryStatus, string> = {
  processing: "em processamento",
  shipped: "enviado",
  delivered: "entregue",
};

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

    const statusMessage = `O status do pedido foi alterado para ${statusLabelPtBr[status]}`;

    // Persist a timeline event every time status changes.
    await prisma.deliveryLog.create({
      data: {
        deliveryId: id,
        description: statusMessage,
      },
    });

    return response.json();
  }
}

export { DeliveriesStatusController };
