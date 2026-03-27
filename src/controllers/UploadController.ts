import { Request, Response } from 'express';

class UploadController {
  // Upload da Capa (Max 10 linhas)
  public async cover(req: Request, res: Response) {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    
    const { manga_id } = req.params;
    // await db.Manga.update({ capa_url: req.file.path }, { where: { id: manga_id } });
    
    return res.status(200).json({ message: 'Capa OK!', manga_id, capa_url: req.file.path });
  }

  // Upload da Página (Max 10 linhas)
  public async page(req: Request, res: Response) {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    
    const { manga_id, capitulo_id, numero_pagina } = req.params;
    // await db.Pagina.create({ manga_id, capitulo_id, numero_pagina, imagem_url: req.file.path });
    
    return res.status(200).json({ message: 'Página OK!', capitulo_id, numero_pagina, imagem_url: req.file.path });
  }
}

export default new UploadController();