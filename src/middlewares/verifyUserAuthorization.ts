import { Request, Response, NextFunction } from "express";
import { AppError } from "@/utils/AppError";
import { UserRole } from "@/generated/prisma";

// Factory middleware to protect routes by accepted roles.
function verifyUserAuthorization(role: UserRole[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    if (!request.user) {
      throw new AppError("Unauthorized", 401);
    }

    if (!role.includes(request.user.role)) {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };
}

export { verifyUserAuthorization };
