import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';

// Define o tipo de arquivo para o callback do fileFilter
type File = Express.Multer.File;

// Filtro para aceitar apenas imagens
const imageFileFilter = (req: Request, file: File, cb: FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de arquivo não suportado! Apenas imagens são permitidas.'));
  }
};

// Configuração para o upload da CAPA do mangá
const coverStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/covers';
    // Cria o diretório se não existir
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // O ID do mangá deve ser passado no corpo da requisição
    const mangaId = req.body.manga_id;
    if (!mangaId) {
      return cb(new Error('ID do mangá não fornecido!'), '');
    }
    // Nome do arquivo: cover-idDoManga-timestamp.extensao
    const uniqueSuffix = Date.now();
    const extension = path.extname(file.originalname);
    cb(null, `cover-${mangaId}-${uniqueSuffix}${extension}`);
  }
});

// Configuração para o upload das PÁGINAS do capítulo
const pagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { manga_id, capitulo_id } = req.body;
    if (!manga_id || !capitulo_id) {
      return cb(new Error('ID do mangá ou do capítulo não fornecido!'), '');
    }
    // Organiza as páginas em pastas por mangá e capítulo
    const dir = `uploads/mangas/${manga_id}/${capitulo_id}`;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // O número da página deve ser passado no corpo
    const { numero_pagina } = req.body;
    if (!numero_pagina) {
      return cb(new Error('Número da página não fornecido!'), '');
    }
    // Nome do arquivo: page-numeroDaPagina.extensao
    const extension = path.extname(file.originalname);
    cb(null, `page-${numero_pagina}${extension}`);
  }
});

// Exporta as duas configurações do Multer
export const uploadCover = multer({ storage: coverStorage, fileFilter: imageFileFilter });
export const uploadPages = multer({ storage: pagesStorage, fileFilter: imageFileFilter });
