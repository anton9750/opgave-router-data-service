import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

// Import local files using explicit .ts extensions as required by your tsconfig
import { indexRoutes } from './routes/indexRoutes.ts';
import { bilerRoutes } from './routes/bilerRoutes.ts';
import { afdelingerRoutes } from './routes/afdelingerRoutes.ts';
import { buserRoutes } from './routes/buserRoutes.ts';
import { carRoutes } from './routes/carRoutes.ts';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

// JSON middleware (important for incoming POST/PUT payloads)
app.use(express.json());

// Main App Routes
app.use('/', indexRoutes);
app.use('/biler', bilerRoutes);
app.use('/afdelinger', afdelingerRoutes);
app.use('/buser', buserRoutes);

// Prisma Database Route
app.use('/api/cars', carRoutes);

// 404 Error handling middleware
app.use((req: Request, res: Response) => {
    res.status(404).send(
        '<h1>404 - Siden blev ikke fundet</h1><p>Beklager, den URL findes ikke på vores server.</p>'
    );
});

app.listen(PORT, () => {
    console.log(`Serveren kører på http://localhost:${PORT}`);
});