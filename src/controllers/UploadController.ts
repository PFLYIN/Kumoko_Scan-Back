import { Request, Response } from 'express';
import Manga from '../models/Manga';
import Pagina from '../models/Pagina';

class UploadController {
  public async cover(req: Request, res: Response) {
    try {
      if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    
      const { manga_id } = req.params;

      // O Sequelize atualiza e retorna um array onde a posição 0 é a quantidade de linhas alteradas
      const [linhasAfetadas] = await Manga.update(
        { capa_url: req.file.path }, 
        { where: { id: manga_id } }
      );
    
      return res.status(200).json({ 
        message: 'Capa OK!', 
        manga_id, 
        linhas_alteradas: linhasAfetadas, 
        capa_url: req.file.path
      });
    } catch (error) {
      console.error('Erro no update do banco:', error);
      return res.status(500).json({ error: 'Erro interno ao tentar salvar no banco.' });
    }
  }

  public async page(req: Request, res: Response) {
    if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo enviado.' });
    
    const { manga_id, capitulo_id, numero_pagina } = req.params;

    return res.status(200).json({ message: 'Página OK!', capitulo_id, numero_pagina, imagem_url: req.file.path });
  }
}

export default new UploadController();