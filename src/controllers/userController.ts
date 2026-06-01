import type { Request, Response } from 'express';
import { prisma } from '../prisma.ts'; // 🟢 Use .ts here too

export const getRecords = async (req: Request, res: Response) => {
  const data = await prisma.user.findMany({ // ✨ TypeScript will now see this too!
    select: {
      id: true,
      firstname: true
    }
  });

  res.json(data);
};