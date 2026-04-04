import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { z, ZodError } from "zod";

// Single place to map domain/validation/runtime errors to HTTP responses.
function errorHandling(
  error: any,
  req: Request,
  res: Response,
  _: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({ message: error.message });
  }

  if(error instanceof ZodError){
    return res.status(400).json({message: "Validation error!", issues: z.treeifyError(error)})
  }

  return res.status(500).json({ message: error.message });
}

export { errorHandling };
