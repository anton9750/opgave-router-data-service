import { Router } from "express";
import { userController } from "../controllers/userController.ts";

const routes = Router();

routes.post("/", userController.createRecord);       // Opret
routes.get("/", userController.getRecords);         // Hent alle
routes.get("/:id", userController.getRecord);       // Hent én
routes.put("/:id", userController.updateRecord);     // Opdater
routes.delete("/:id", userController.deleteRecord);  // Slet

export const userRoutes = routes;