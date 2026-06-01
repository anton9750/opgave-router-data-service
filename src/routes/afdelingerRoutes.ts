// src/routes/afdelingerRoutes.ts
import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.send(`
        <h1>Afdelinger</h1>
        <p>Vælg en landsdel:</p>
        <ul>
            <li><a href="/afdelinger/jylland">Jylland</a></li>
            <li><a href="/afdelinger/fyn">Fyn</a></li>
            <li><a href="/afdelinger/sjælland">Sjælland</a></li>
            <li><a href="/afdelinger/nuuk">Nuuk</a></li>
        </ul>
    `);
});

// Dynamisk route for afdelinger
router.get('/:landsdel', (req: Request, res: Response) => {
    const landsdelParam = Array.isArray(req.params.landsdel) ? req.params.landsdel[0] : req.params.landsdel;
    const { landsdel } = req.params;   // Destructuring (bonus)

    res.send(`
        <h1>Afdeling: ${landsdel}</h1>
        <p>Du har valgt afdelingen i <strong>${landsdel}</strong>.</p>
        <a href="/afdelinger">Tilbage til oversigt</a>
    `);
});

export const afdelingerRoutes = router;