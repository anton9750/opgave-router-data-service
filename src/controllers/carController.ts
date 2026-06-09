import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";

class CarController {

  // 1. READ ALL - Hent alle biler med relaterede data (Løser krav + bonus)
  getRecords = async (req: Request, res: Response) => {
    try {
      // Henter sortering fra URL query (f.eks. ?sort=brand eller ?sort=category)
      const sortBy = req.query.sort as string;

      let orderByObj: any = {};
      
      // Bonusopgave: Dynamisk sortering efter brand eller kategori
      if (sortBy === 'brand') {
        orderByObj = { brand: { name: 'asc' } };
      } else if (sortBy === 'category') {
        orderByObj = { category: { name: 'asc' } };
      } else {
        orderByObj = { id: 'asc' }; // Standard sortering efter ID
      }

      const cars = await prisma.car.findMany({
        include: {
          brand: true,    // Bonusopgave: Viser alle felter (id, name, logo) fra brand
          category: true  // Bonusopgave: Viser alle felter (id, name) fra kategori
        },
        orderBy: orderByObj
      });

      return res.status(200).json(cars);
      
    } catch (error) {
      console.error("Fejl i getRecords:", error);
      return res.status(500).json({ error: "Kunne ikke hente biler fra databasen" });
    }
  };

  // 2. READ ONE - Hent én specifik bil med dens brand og kategori
  getRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const car = await prisma.car.findUnique({
        where: { id: Number(id) },
        include: {
          brand: true,
          category: true
        }
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

  // 3. CREATE - Opret bil med relationer til brandId og categoryId
  createRecord = async (req: Request, res: Response) => {
    try {
      const { model, price, brandId, categoryId } = req.body;

      // Validering: Tjek om de nye relations-id'er er sendt med
      if (!model || !price || !brandId || !categoryId) {
        return res.status(400).json({ 
          error: "Venligst udfyld alle felter: model, price, brandId og categoryId" 
        });
      }

      const newCar = await prisma.car.create({
        data: {
          model,
          price: Number(price),
          brandId: Number(brandId),       // Gemmer fremmednøglen til brandet
          categoryId: Number(categoryId)  // Gemmer fremmednøglen til kategorien
        },
        include: {
          brand: true,
          category: true
        }
      });

      return res.status(201).json(newCar);

    } catch (error) {
      console.error("Fejl ved oprettelse af bil:", error);
      return res.status(500).json({ error: "Kunne ikke oprette bilen. Tjek om brandId og categoryId eksisterer." });
    }
  };

  // 4. UPDATE - Opdater en bil og dens relationer
  updateRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { model, price, brandId, categoryId } = req.body;

      const updatedCar = await prisma.car.update({
        where: { id: Number(id) },
        data: {
          model,
          price: price !== undefined ? Number(price) : undefined,
          brandId: brandId !== undefined ? Number(brandId) : undefined,
          categoryId: categoryId !== undefined ? Number(categoryId) : undefined
        },
        include: {
          brand: true,
          category: true
        }
      });

      return res.status(200).json(updatedCar);

    } catch (error: any) {
      console.error("Fejl ved opdatering af bil:", error);
      
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "Bilen kunne ikke opdateres, da ID'et ikke findes" });
      }

      return res.status(500).json({ error: "Kunne ikke opdatere bilen i databasen" });
    }
  };

  // 5. DELETE - Slet bil
  deleteRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      await prisma.car.delete({
        where: { id: Number(id) }
      });

      return res.status(200).json({ message: "Bilen er slettet succesfuldt" });

    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "Bilen findes ikke og kunne ikke slettes" });
      }
      return res.status(500).json({ error: "Kunne ikke slette bilen" });
    }
  };
} 

export const carController = new CarController();