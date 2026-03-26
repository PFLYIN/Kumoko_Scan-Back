import { Request, Response } from "express";
import db from "../config/database";

class UploadController {
    async cover(req: Request, res: Response) {
        if (!req.file) return res.status(400).json({ error: 'Nenhum arquivo de capa enviado' });

        const capa_url = req.file.path;
        const { manga_id } = req.params;

        try {
            await db.Manga.update({ capa_url }, { where: { id: manga_id } });
            return res.json({ message: 'Sucesso', manga_id, capa_url});
        } catch (error) {
            return res.status(500).json({ error: 'Erro ao salvar a capa do mangá'});
        }
    }
}