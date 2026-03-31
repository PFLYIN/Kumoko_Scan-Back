import { Request, Response } from 'express';
import Capitulo from '../models/Capitulo';

class CapituloController {
    public async create(req: Request, res: Response) {
        try {
            const { manga_id, numero, titulo } = req.body;
            if (!manga_id || numero === undefined) 
                return res.status(400).json({ error: 'Mangá ID e número são obrigatórios.' });

            const novoCapitulo = await Capitulo.create({ manga_id, numero, titulo });
            return res.status(201).json(novoCapitulo);
        } catch (error) {
            console.error("Erro ao criar capítulo:", error);
            return res.status(500).json({ error: "Erro interno"});
        }
    } 
}

export default new CapituloController();