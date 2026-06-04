import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";

class CarController {

  // READ (Hent alle biler)
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

  // READ (Hent én enkelt bil ud fra ID)
  getRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const car = await prisma.car.findUnique({
        where: { id: Number(id) }
      });

      if (!car) {
        return res.status(404).json({ error: "Bilen blev ikke fundet" });
      }

      return res.status(200).json(car);

    } catch (error) {
      console.error("Fejl ved hentning af specifik bil:", error);
      return res.status(500).json({ error: "Fejl ved hentning af bil" });
    }
  };

  // 🟢 NY METODE: UPDATE (Opdater en eksisterende bil ud fra ID)
  updateRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { brand, model, price } = req.body;

      // Opdater bilen via Prisma update()
      const updatedCar = await prisma.car.update({
        where: { 
          id: Number(id) 
        },
        data: {
          brand,
          model,
          // Sørg for at konvertere prisen til et tal, hvis den sendes med
          price: price !== undefined ? Number(price) : undefined
        }
      });

      // Returner den opdaterede bil som JSON
      return res.status(200).json(updatedCar);

    } catch (error: any) {
      console.error("Fejl ved opdatering af bil:", error);
      
      // Bonusopgave: Hvis Prisma kaster en fejl fordi id'et ikke findes (Prisma kode P2025)
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "Bilen kunne ikke opdateres, da ID'et ikke findes" });
      }

      return res.status(500).json({ error: "Kunne ikke opdatere bilen i databasen" });
    }
  };

  // CREATE (Opret bil)
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