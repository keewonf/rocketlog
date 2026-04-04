import { UserRole } from "@prisma/client";
//type UserRole = "customer" | "sale";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
      };
    }
  }
}
