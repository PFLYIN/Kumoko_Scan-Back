import { Router } from 'express';
import { uploadCover } from '../config/multer';
import LivroController from '../controllers/LivroController';

const router = Router();

// Usamos o seu multer com o nome exato do campo: cover_image
router.post('/', uploadCover.single('cover_image'), LivroController.create);
router.get('/', LivroController.list);

export default router;