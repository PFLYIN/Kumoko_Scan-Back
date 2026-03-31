import { Router } from 'express';
import CapituloController from '../controllers/CapituloController';

const router = Router();

// Rota POST para criar o capítulo
router.post('/', CapituloController.create);

export default router;