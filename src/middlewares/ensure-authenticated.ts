import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { UserRole } from "@/generated/prisma";
import { authConfig } from "@/configs/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
  role: UserRole;
  sub: string;
}

function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token not found", 401);
    }

    const [, token] = authHeader.split(" ");
    // Decode token claims and attach authenticated user context to the request.
    const { role, sub: user_id } = verify(
      token,
      authConfig.jwt.secret,
    ) as TokenPayload;

    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError("Invalid JWT token", 401);
  }
}

export { ensureAuthenticated };
