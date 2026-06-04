import { Router } from "express";
import { carController } from '../controllers/carController.ts';

const routes = Router();

// READ - Hent alle biler
routes.get("/", carController.getRecords);

// READ - Hent én bil ud fra ID
routes.get("/:id", carController.getRecord);

// 🟢 NY: UPDATE - Opdater en bil ud fra ID
routes.put("/:id", carController.updateRecord);

// CREATE - Opret en bil
routes.post("/", carController.createRecord);

export const carRoutes = routes;