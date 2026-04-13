import { Request, Response } from 'express';
import Manga from '../models/Manga';
import fs from 'fs';
import path from 'path';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

class MangaController {
public async create(req: Request, res: Response) {
    try {
      const { nome, volume } = req.body;
      if (!nome || volume === undefined) return res.status(400).json({ error: 'Nome e volume são obrigatórios.' });

      // O Multer desempacotou a foto e guardou as informações dela no req.file
      // Nós pegamos o caminho exato onde ele salvou a foto no seu HD
      const capa_url = req.file ? req.file.path : null;

      const novoManga = await Manga.create({ 
        nome, 
        volume,
        capa_url // <-- Gravamos o caminho no banco de dados!
      });
      
      return res.status(201).json(novoManga);
    } catch (error) {
      console.error('Erro ao criar mangá:', error);
      return res.status(500).json({ error: 'Erro interno.' });
    }
  }

  // 2. Ler (GET)
  public async list(req: Request, res: Response) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;
      const mangas = await Manga.findAndCountAll({ limit, offset });
      return res.status(200).json({ total: mangas.count, page, dados: mangas.rows });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar.' });
    }
  }

  // 3. Atualizar (PUT)
  public async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, volume } = req.body;
      
      const [linhasAfetadas] = await Manga.update({ nome, volume }, { where: { id } });
      if (linhasAfetadas === 0) return res.status(404).json({ error: 'Mangá não encontrado.' });
      
      return res.status(200).json({ message: 'Mangá atualizado com sucesso!' });
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar.' });
    }
  }

  // 4. Deletar (DELETE) - Com faxina no HD!
  public async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const manga = await Manga.findByPk(id);
      
      if (!manga) return res.status(404).json({ error: 'Mangá não encontrado.' });

      // A. Apaga o arquivo da capa solto, se existir
      if (manga.capa_url && fs.existsSync(manga.capa_url)) {
        fs.unlinkSync(manga.capa_url); 
      }

      // B. Apaga a pasta inteira do mangá (que contém os capítulos e páginas)
      const pastaManga = path.resolve(__dirname, '..', '..', 'uploads', 'pages', `manga_${id}`);
      if (fs.existsSync(pastaManga)) {
        // recursive: true apaga tudo que tem dentro, force: ignora se não existir
        fs.rmSync(pastaManga, { recursive: true, force: true });
      }

      // C. Deleta do banco de dados
      await manga.destroy();
      
      return res.status(200).json({ message: 'Mangá e todos os seus arquivos foram desintegrados do sistema!' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Erro ao deletar.' });
        }
    }
    
}


export default new MangaController();