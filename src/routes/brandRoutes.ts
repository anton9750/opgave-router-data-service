import { Router } from "express";
import { brandController } from "../controllers/brandController.ts";

const routes = Router();

routes.post("/", brandController.createRecord);
routes.get("/", brandController.getRecords);
routes.get("/:id", brandController.getRecord);
routes.put("/:id", brandController.updateRecord);
routes.delete("/:id", brandController.deleteRecord);

export const brandRoutes = routes;