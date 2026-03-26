import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import fs from 'fs';
import { Request } from 'express';


type File = Express.Multer.File;

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
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const mangaId = req.params.manga_id;
    if (!mangaId) return cb(new Error('ID do mangá não fornecido!'), '');

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
  
    const dir = `uploads/mangas/${manga_id}/${capitulo_id}`;
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const { numero_pagina } = req.body;
    if (!numero_pagina) {
      return cb(new Error('Número da página não fornecido!'), '');
    }

    const extension = path.extname(file.originalname);
    cb(null, `page-${numero_pagina}${extension}`);
  }
});

export const uploadCover = multer({ storage: coverStorage, fileFilter: imageFileFilter });
export const uploadPages = multer({ storage: pagesStorage, fileFilter: imageFileFilter });
