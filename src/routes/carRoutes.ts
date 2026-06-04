
import { Router } from "express";
import { carController } from '../controllers/carController.ts';

const routes = Router();

routes.get("/", carController.getRecords);


routes.post("/", carController.createRecord);

export const carRoutes = routes;