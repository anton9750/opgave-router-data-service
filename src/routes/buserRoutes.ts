// src/routes/buserRoutes.ts
import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const buser = [
    { id: 1, mærke: 'bus 17', model: 'city bus', pris: 250000 },
    { id: 2, mærke: 'bus 18', model: 'long stride bus', pris: 320000 },
    { id: 3, mærke: 'bus 19', model: 'lawn bus', pris: 290000 }
];

router.get('/', (req: Request, res: Response) => {
    res.status(200).json(buser);
});

export const buserRoutes = router;