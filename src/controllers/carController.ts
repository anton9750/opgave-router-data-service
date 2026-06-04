
import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";

class CarController {

 
  getRecords = async (req: Request, res: Response) => {
    try {
      const sortOrder = req.query.sort === 'asc' ? 'asc' : 'desc';

      const cars = await prisma.car.findMany({
        select: {
          id: true,
          brand: true,
          model: true,
          // @ts-ignore
          price: true
        },
        orderBy: {
          // @ts-ignore
          price: sortOrder
        }
      });

      return res.json(cars);
      
    } catch (error) {
      console.error("Fejl i getRecords:", error);
      return res.status(500).json({ error: "Kunne ikke hente biler fra databasen" });
    }
  };

 
  createRecord = async (req: Request, res: Response) => {
    try {
      const { brand, model, price } = req.body;

      
      if (!brand || !model || !price) {
        return res.status(400).json({ error: "Venligst udfyld alle felter: brand, model og price" });
      }

     
      const newCar = await prisma.car.create({
        data: {
          brand,
          model,
          price: Number(price) 
        }
      });


      return res.status(201).json(newCar);

    } catch (error) {
      console.error("Fejl ved oprettelse af bil:", error);
      return res.status(500).json({ error: "Kunne ikke oprette bilen i databasen" });
    }
  };

} 

export const carController = new CarController();

