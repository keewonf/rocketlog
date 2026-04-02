import { DeliveriesController } from "@/controllers/deliveries-controller";
import { Router } from "express";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";

const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();

deliveriesRoutes.use(ensureAuthenticated);
deliveriesRoutes.post("/", deliveriesController.create);

export { deliveriesRoutes };
