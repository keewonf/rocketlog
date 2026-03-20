import { UsersController } from "@/controllers/users-controller";
import { Router } from "express";

const userRoutes = Router();
const usersController = new UsersController();

userRoutes.post("/", usersController.create);

export { userRoutes };
