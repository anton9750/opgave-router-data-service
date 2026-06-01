import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('<h1>Velkommen til Bil & Bus forhandleren!</h1><p>Brug menuen til at navigere.</p>');
});

router.get('/hvem-er-vi', (req: Request, res: Response) => {
    res.status(200).send('<h1>Hvem er vi?</h1><p>Vi er en førende forhandler af biler og busser i Danmark.</p>');
});

router.get('/kontakt', (req: Request, res: Response) => {
    res.status(200).send('<h1>Kontakt os</h1><p>Telefon: 72 50 10 00<br>Email: mail@techcollege.dk</p>');
});

export const indexRoutes = router;