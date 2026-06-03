// src/index.ts
import express from 'express';
import type { Request, Response } from 'express';
import dotenv from 'dotenv';

import { indexRoutes } from './routes/indexRoutes.ts';
import { bilerRoutes } from './routes/bilerRoutes.ts';
import { afdelingerRoutes } from './routes/afdelingerRoutes.ts';
import { buserRoutes } from './routes/buserRoutes.ts';
import { carRoutes } from './routes/carRoutes.ts';
import { categoryRoutes } from './routes/categoryRoutes.ts';
import { brandRoutes } from './routes/brandRoutes.ts';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes);
app.use('/biler', bilerRoutes);
app.use('/afdelinger', afdelingerRoutes);
app.use('/buser', buserRoutes);
app.use('/api/cars', carRoutes);

// 🟢 2. FORBIND DEM SÅ DE KAN KALDES FRA POSTMAN:
app.use('/api/categories', categoryRoutes); // Nu virker http://localhost:4000/api/categories
app.use('/api/brands', brandRoutes);       // Nu virker http://localhost:4000/api/brands

app.use((req: Request, res: Response) => {
    res.status(404).send('<h1>404 - Siden blev ikke fundet</h1>');
});

app.listen(PORT, () => {
    console.log(`Serveren kører på http://localhost:${PORT}`);
});