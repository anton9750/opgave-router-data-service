import type { Request, Response } from "express";
import { prisma } from "../prisma.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  
  // Genererer token ud fra brugerens ID
  private generateToken = (user: { id: number }) => {
    const key = process.env.TOKEN_ACCESS_KEY;
    const expiresIn = process.env.TOKEN_ACCESS_EXPIRATION_SECS || "3600";

    if (!key) {
      throw new Error("Missing TOKEN_ACCESS_KEY in .env file");
    }

    const exp = Math.floor(Date.now() / 1000) + Number(expiresIn);

    return jwt.sign({ exp, data: { id: user.id } }, key);
  };

  // Login metode
  authenticate = async (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Bonusopgave: Tydelig fejlbesked hvis felter mangler
    if (!username || !password) {
      return res.status(400).json({ 
        error: "Ufuldstændig data", 
        message: "Både email (username) og password skal udfyldes." 
      });
    }

    try {
      // Finder brugeren baseret på email (username i Postman)
      const user = await prisma.user.findFirst({
        where: {
          email: username,
          isActive: true
        }
      });

      // Bonusopgave: Tydelig fejlbesked ved forkert login (401 Unauthorized)
      if (!user) {
        return res.status(401).json({ 
          error: "Logindata er forkert", 
          message: "Den indtastede email eller adgangskode er forkert." 
        });
      }

      // Tjekker password med bcrypt
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ 
          error: "Logindata er forkert", 
          message: "Den indtastede email eller adgangskode er forkert." 
        });
      }

      // Genererer JWT token
      const accessToken = this.generateToken(user);

      // Returnerer token og de vigtigste brugeroplysninger
      return res.status(200).json({
        message: "Login succesfuldt",
        accessToken,
        user: {
          id: user.id,
          fornavn: user.fornavn,
          efternavn: user.efternavn
        }
      });

    } catch (error: any) {
      return res.status(500).json({ error: "Serverfejl", message: error.message });
    }
  };
}

export const authController = new AuthController();