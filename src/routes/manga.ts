import { Router } from 'express';
import MangaController from '../controllers/MangaController';

const router = Router();

router.post('/', MangaController.create);
router.get('/', MangaController.list);

export default router;