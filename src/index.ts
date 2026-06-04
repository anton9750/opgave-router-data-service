import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

import { indexRoutes } from './routes/indexRoutes.ts';
import { afdelingerRoutes } from './routes/afdelingerRoutes.ts';
import { buserRoutes } from './routes/buserRoutes.ts';
import { carRoutes } from './routes/carRoutes.ts'; // Din nye, fejlfrie bil-router
import { categoryRoutes } from './routes/categoryRoutes.ts';
import { brandRoutes } from './routes/brandRoutes.ts';

dotenv.config();

const PORT = process.env.PORT || 3000; // Standardiseret til 3000 (eller hvad din .env siger)
const app = express();

// Middleware til at læse data sendt fra Postman (både JSON og Urlencoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Globale ruter / Endpoints
app.use('/', indexRoutes);
app.use('/afdelinger', afdelingerRoutes);
app.use('/buser', buserRoutes);

// Dine nye Prisma-baserede API-ruter
app.use('/api/cars', carRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);

// Catch-all fejlhåndtering (Hvis ingen af de ovenstående ruter matcher)
app.use((req: Request, res: Response) => {
    res.status(404).send('<h1>404 - Siden blev ikke fundet</h1>');
});

app.listen(PORT, () => {
    console.log(`Serveren kører på http://localhost:${PORT}`);
});