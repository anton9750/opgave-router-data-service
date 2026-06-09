import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";
import bcrypt from "bcrypt";

class UserController {
  

  createRecord = async (req: Request, res: Response) => {
    try {
      const { fornavn, efternavn, email, password, role, isActive } = req.body;

      
      if (!fornavn || !efternavn || !email || !password) {
        return res.status(400).json({ error: "Fornavn, efternavn, email og password skal udfyldes" });
      }


      if (password.length < 6) {
        return res.status(400).json({ error: "Password skal være på mindst 6 tegn" });
      }

    
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: "En bruger med denne email eksisterer allerede" });
      }


      const hashedPassword = await bcrypt.hash(password, 10);


      const newUser = await prisma.user.create({
        data: {
          fornavn,
          efternavn,
          email,
          password: hashedPassword,
          role: role || "user",
          isActive: isActive !== undefined ? Boolean(isActive) : true
        }
      });


      const { password: _, ...userWithoutPassword } = newUser;
      return res.status(201).json(userWithoutPassword);

    } catch (error) {
      console.error("Fejl ved oprettelse af bruger:", error);
      return res.status(500).json({ error: "Kunne ikke oprette brugeren" });
    }
  };


  getRecords = async (req: Request, res: Response) => {
    try {
      const users = await prisma.user.findMany({
        select: {
          id: true,
          fornavn: true,
          efternavn: true,
          email: true,
          role: true,
          isActive: true
        }
      });
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: "Kunne ikke hente brugere" });
    }
  };


  getRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id: Number(id) },
        select: {
          id: true,
          fornavn: true,
          efternavn: true,
          email: true,
          role: true,
          isActive: true
        }
      });

      if (!user) {
        return res.status(404).json({ error: "Brugeren blev ikke fundet" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: "Fejl ved hentning af bruger" });
    }
  };


  updateRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { fornavn, efternavn, email, password, role, isActive } = req.body;


      let updatedData: any = { fornavn, efternavn, email, role, isActive };
      if (password) {
        if (password.length < 6) {
          return res.status(400).json({ error: "Det nye password skal være på mindst 6 tegn" });
        }
        updatedData.password = await bcrypt.hash(password, 10);
      }

      const updatedUser = await prisma.user.update({
        where: { id: Number(id) },
        data: updatedData
      });

      const { password: _, ...userWithoutPassword } = updatedUser;
      return res.status(200).json(userWithoutPassword);
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "Brugeren findes ikke" });
      }
      return res.status(500).json({ error: "Kunne ikke opdatere brugeren" });
    }
  };

  // 5. DELETE - Slet bruger
  deleteRecord = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await prisma.user.delete({
        where: { id: Number(id) }
      });
      return res.status(200).json({ message: "Brugeren er blevet slettet" });
    } catch (error: any) {
      if (error.code === 'P2025') {
        return res.status(404).json({ error: "Brugeren kunne ikke slettes, da ID ikke findes" });
      }
      return res.status(500).json({ error: "Kunne ikke slette brugeren" });
    }
  };
}

export const userController = new UserController();