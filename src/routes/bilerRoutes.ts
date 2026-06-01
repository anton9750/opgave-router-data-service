// src/routes/bilerRoutes.ts
import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const biler = [
    { id: 1, mærke: 'Volvo', model: 'V60', pris: 250000, årgang: 2023 },
    { id: 2, mærke: 'Tesla', model: 'Model 3', pris: 320000, årgang: 2024 },
    { id: 3, mærke: 'Volkswagen', model: 'ID.4', pris: 290000, årgang: 2023 }
];

// Liste over alle biler
router.get('/', (req: Request, res: Response) => {
    res.status(200).json(biler);
});

// Dynamisk route - Bil detaljer efter ID
router.get('/:id', (req: Request, res: Response)  => {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const id = parseInt(idParam)
    const bil = biler.find(b => b.id === id);

    if (bil) {
        res.status(200).json(bil);
    } else {
        res.status(404).send('bil med ${Id} blev ikke fundet');
    }
    });


// Bonus: Flere parametre + destructuring
router.get('/:id/:model', (req: Request, res: Response) => {
    const idParam = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const modelParam = Array.isArray(req.params.model) ? req.params.model[0] : req.params.model;

    res.status(200).json({
        message: "Dynamisk route med flere parametre",
        id: parseInt(idParam),
        model: modelParam,
        fullUrl: `/biler/${idParam}/${modelParam}`
    });
});

export const bilerRoutes = router;