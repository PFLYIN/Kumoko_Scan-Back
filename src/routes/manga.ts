import { Router } from 'express';
import MangaController from '../controllers/MangaController';

const router = Router();

router.post('/', MangaController.create);
router.get('/', MangaController.list);
router.put('/:id', MangaController.update);
router.delete('/:id', MangaController.delete);

export default router;