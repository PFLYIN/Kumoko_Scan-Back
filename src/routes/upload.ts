import { Router } from 'express';
// Aqui está o segredo: importando os dois uploads do multer!
import { uploadCover, uploadPages } from '../config/multer'; 
import UploadController from '../controllers/UploadController';

const router = Router();

// Rota de capa (ID do mangá na URL)
router.post('/cover/:manga_id', uploadCover.single('cover_image'), UploadController.cover);

// Rota de página (IDs e número da página na URL)
router.post('/page/:manga_id/:capitulo_id/:numero_pagina', uploadPages.single('page_image'), UploadController.page);

export default router;