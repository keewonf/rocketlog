import { UserRole } from "@/generated/prisma";
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
