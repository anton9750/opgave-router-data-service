import type { Request, Response } from "express";
import { prisma } from "../prisma.ts"; // 🟢 Use .ts because of allowImportingTsExtensions

class CarController {
  getRecords = async (req: Request, res: Response) => {
    const cars = await prisma.car.findMany(); // ✨ TypeScript will now see this!
    res.json(cars);
  };
}

export const carController = new CarController();