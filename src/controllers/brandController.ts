// src/controllers/brandController.ts
import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";

class BrandController {
  // CREATE
  createRecord = async (req: Request, res: Response) => {
    try {
      const { name, logo } = req.body;
      if (!name || !logo) return res.status(400).json({ error: "Både name og logo skal udfyldes" });

      const newBrand = await prisma.brand.create({ data: { name, logo } });
      return res.status(201).json(newBrand);
    } catch (error) {
      return res.status(500).json({ error: "Kunne ikke oprette brand" });
    }
  };

  // READ (Alle - Sorteret alfabetisk)
  getRecords = async (req: Request, res: Response) => {
    try {
      const brands = await prisma.brand.findMany({
        orderBy: { name: 'asc' }
      });
      return res.json(brands);
    } catch (error) {
      return res.status(500).json({ error: "Kunne ikke hente brands" });
    }
  };

  // READ (Enkelt ud fra ID)
  getRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const brand = await prisma.brand.findUnique({
        where: { id: Number(id) }
      });
      if (!brand) return res.status(404).json({ error: "Brand blev ikke fundet" });
      return res.json(brand);
    } catch (error) {
      return res.status(500).json({ error: "Fejl ved hentning af brand" });
    }
  };

  // UPDATE
  updateRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name, logo } = req.body;

      const updatedBrand = await prisma.brand.update({
        where: { id: Number(id) },
        data: { name, logo }
      });
      return res.json(updatedBrand);
    } catch (error) {
      return res.status(500).json({ error: "Kunne ikke opdatere brand" });
    }
  };

  // DELETE
  deleteRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.brand.delete({
        where: { id: Number(id) }
      });
      return res.json({ message: "Brand slettet succesfuldt" });
    } catch (error) {
      return res.status(500).json({ error: "Kunne ikke slette brand" });
    }
  };
}

export const brandController = new BrandController();