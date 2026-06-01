import { Router } from "express";
// Import the car controller with the exact .ts file extension matching your runtime config
import { carController } from '../controllers/carController.ts';

const routes = Router();

// Route that forwards requests directly into the database controller method
routes.get("/", carController.getRecords);

export const carRoutes = routes;