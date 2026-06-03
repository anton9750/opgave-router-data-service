// src/controllers/carController.ts
import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";

class CarController {

  // 1. Din eksisterende hent-metode (READ)
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

  // 🟢 2. HER SKAL DEN NYE METODE INDSÆTTES (CREATE)
  createRecord = async (req: Request, res: Response) => {
    try {
      const { brand, model, price } = req.body;

      // Validering: Tjek om alle påkrævede felter er sendt med
      if (!brand || !model || !price) {
        return res.status(400).json({ error: "Venligst udfyld alle felter: brand, model og price" });
      }

      // Opretter rækken i databasen via Prisma model
      const newCar = await prisma.car.create({
        data: {
          brand,
          model,
          price: Number(price) // Konverterer strengen fra formularen til et tal
        }
      });

      // Returnerer den nye række som JSON (inklusive id)
      return res.status(201).json(newCar);

    } catch (error) {
      console.error("Fejl ved oprettelse af bil:", error);
      return res.status(500).json({ error: "Kunne ikke oprette bilen i databasen" });
    }
  };

} // <- Dette er den afsluttende tuborg-klap for klassen, som metoden skal være INDENFOR.

export const carController = new CarController();

