// src/routes/carRoutes.ts
import { Router } from "express";
import { carController } from '../controllers/carController.ts';

const routes = Router();

// Hent alle biler (GET)
routes.get("/", carController.getRecords);

// 🟢 Opret en ny bil (POST)
routes.post("/", carController.createRecord);

export const carRoutes = routes;