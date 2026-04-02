import { Request, Response } from "express";
import { AppError } from "@/utils/AppError";
import { prisma } from "@/database/prisma";
import { z } from "zod";

class DeliveriesController {
  async create(request: Request, response: Response) {
    return response.json({ message: "Criado com sucesso" });
  }
}

export { DeliveriesController}