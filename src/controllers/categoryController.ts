// src/controllers/categoryController.ts
import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";

class CategoryController {
  // CREATE
  createRecord = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: "Navn på kategori mangler" });

      const newCategory = await prisma.category.create({ data: { name } });
      return res.status(201).json(newCategory);
    } catch (error) {
      return res.status(500).json({ error: "Kunne ikke oprette kategori" });
    }
  };

  // READ (Alle - Sorteret alfabetisk)
  getRecords = async (req: Request, res: Response) => {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
      });
      return res.json(categories);
    } catch (error) {
      return res.status(500).json({ error: "Kunne ikke hente kategorier" });
    }
  };

  // READ (Enkelt ud fra ID)
  getRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const category = await prisma.category.findUnique({
        where: { id: Number(id) }
      });
      if (!category) return res.status(404).json({ error: "Kategorien blev ikke fundet" });
      return res.json(category);
    } catch (error) {
      return res.status(500).json({ error: "Fejl ved hentning af kategori" });
    }
  };

  // UPDATE
  updateRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const updatedCategory = await prisma.category.update({
        where: { id: Number(id) },
        data: { name }
      });
      return res.json(updatedCategory);
    } catch (error) {
      return res.status(500).json({ error: "Kunne ikke opdatere kategori" });
    }
  };

  // DELETE
  deleteRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.category.delete({
        where: { id: Number(id) }
      });
      return res.json({ message: "Kategori slettet succesfuldt" });
    } catch (error) {
      return res.status(500).json({ error: "Kunne ikke slette kategori" });
    }
  };
}

export const categoryController = new CategoryController();