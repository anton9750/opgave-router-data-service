import { Router } from 'express';
import { authController } from '../controllers/authController.ts';

const router = Router();

// Express skal lytte på roden '/' her, da '/api/login' allerede er defineret i index.ts
router.post('/', authController.authenticate);

// Denne navngivne eksport skal matche din import i index.ts fuldstændig
export const authRoutes = router;