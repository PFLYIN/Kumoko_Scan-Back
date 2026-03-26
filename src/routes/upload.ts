import { Router } from 'express';
import { uploadCover } from '../config/multer';
import UploadController from '../controllers/UploadController';
const router = Router();

router.post('/cover/:manga_id', uploadCover.single('cover_image'), UploadController.cover);

router.post('/cover/:manga_id', uploadCover.single('cover_image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo de capa enviado.' });
  }

  const capa_url = req.file.path;
  const manga_id = req.params.manga_id;

  try {
    await db.Manga.update({ capa_url }, { where: { id: manga_id } });
    console.log(`Capa do mangá ${manga_id} salva em: ${capa_url}`);

    return res.json({
      message: 'Capa do mangá enviada com sucesso!',
      manga_id: manga_id,
      capa_url: capa_url
    });
  } catch (error) {
    console.error('Erro ao salvar a capa do mangá:', error);
    return res.status(500).json({ error: 'Erro ao salvar a capa do mangá.' });
  }
});


router.post('/page/:manga_id/:capitulo_id/:numero_pagina', uploadPages.single('page_image'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo de página enviado.' });
  }

  const imagem_url = req.file.path;
  const { manga_id, capitulo_id, numero_pagina } = req.body;

  try {
    await db.Pagina.create({
      manga_id,
      capitulo_id,
      numero_pagina,
      imagem_url
    });

    console.log(`Página ${numero_pagina} do capítulo ${capitulo_id} salva em: ${imagem_url}`);

    return res.json({
      message: 'Página enviada com sucesso!',
      capitulo_id: capitulo_id,
      numero_pagina: numero_pagina,
      imagem_url: imagem_url
    });
  } catch (error) {
    console.error('Erro ao salvar a página do mangá:', error);
    return res.status(500).json({ error: 'Erro ao salvar a página do mangá.' });
  }
});

export default router;

