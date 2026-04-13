import { Router } from 'express';
import MangaController from '../controllers/MangaController';
// Trazemos o seu upload de capas para cá!
import { uploadCover } from '../config/multer'; 

const router = Router();

// O segredo: o Multer intercepta a requisição, salva a imagem 'capa' e passa os textos para o Controller
router.post('/', uploadCover.single('cover_image'), MangaController.create);

router.get('/', MangaController.list);
router.put('/:id', MangaController.update);
router.delete('/:id', MangaController.delete);

export default router;