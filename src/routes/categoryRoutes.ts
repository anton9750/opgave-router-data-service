import { Router } from "express";
import { categoryController } from "../controllers/categoryController.ts";

const routes = Router();

routes.post("/", categoryController.createRecord);
routes.get("/", categoryController.getRecords);
routes.get("/:id", categoryController.getRecord);
routes.put("/:id", categoryController.updateRecord);
routes.delete("/:id", categoryController.deleteRecord);

export const categoryRoutes = routes;