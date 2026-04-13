import { Request, Response } from 'express';
import Pagina from '../models/Pagina';

class UploadController {
  
  // Função para salvar a Página
  public async page(req: Request, res: Response) {
    try {
      const { manga_id, capitulo_id, numero_pagina } = req.params;
      
      // O Multer guardou o caminho da foto aqui
      const imagem_url = req.file ? req.file.path : null;

      if (!imagem_url) {
        return res.status(400).json({ error: 'Nenhuma imagem foi enviada!' });
      }

      // Salva no banco de dados
      const novaPagina = await Pagina.create({
        manga_id: Number(manga_id),
        capitulo_id: Number(capitulo_id),
        numero_pagina: Number(numero_pagina),
        imagem_url
      });

      return res.status(201).json(novaPagina);
    } catch (error) {
      console.error('Erro ao salvar página:', error);
      return res.status(500).json({ error: 'Erro interno ao salvar a página.' });
    }
  }

  // Já deixei a função de buscar a página pronta pro nosso Front-end usar!
  public async getPaginaPorCapitulo(req: Request, res: Response) {
    try {
      const { capitulo_id } = req.params;
      // Como você disse que vai ter só 1 página por capítulo, pegamos a primeira que achar
      const pagina = await Pagina.findOne({ where: { capitulo_id } });
      return res.status(200).json(pagina);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar página.' });
    }
  }
}

export default new UploadController();