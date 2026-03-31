import { Request, Response } from 'express';
import Manga from '../models/Manga';
import { Query } from 'mysql2/typings/mysql/lib/protocol/sequences/Query';

class MangaController {
    public async create(req: Request, res: Response) {
        try {
            const { nome, volume } = req.body;
            if (!nome ||  volume === undefined) {
                return res.status(400).json({error: "Nome e volume são obrigatórios!"});
            }

            const novoManga = await Manga.create({ nome, volume});
            return res.status(201).json(novoManga);
        } catch (error) {
            console.error("Erro ao criar mangá!:", error);
            return res.status(500).json({ error: "Erro interno no servidor!"});
        }
    }
    public async list(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = (page - 1) * limit;

            const mangas = await Manga.findAndCountAll({ limit, offset });

            return res.status(200).json({ total: mangas.count, page, dados: mangas.rows});
        }  catch (error) {
            return res.status(500).json({ error: "Erro ao listar mangás!"});
        }
    }
}


export default new MangaController();