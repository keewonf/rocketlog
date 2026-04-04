import express from "express";
import { errorHandling } from "./middlewares/error-handling";
import { routes } from "./routes";

const app = express();

// Keep middleware order explicit: parser -> routes -> centralized error handler.
app.use(express.json());
app.use(routes);
app.use(errorHandling);

export { app };
