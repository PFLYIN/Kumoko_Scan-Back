import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';
import fs from 'fs';


// 1. Filtro inteligente de imagens
const imageFileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const allowedExtensions = ['.png', '.jpg', '.jpeg', '.webp'];
  const ext = path.extname(file.originalname).toLowerCase();
  
  if (file.mimetype.startsWith('image/') || allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error(`Tipo de arquivo não suportado! Arquivo recebido: ${file.originalname}`));
  }
};

// 2. Storage das Capas
const storageCover = multer.diskStorage({
  destination: (req, file, cb) => {
    const destPath = path.resolve(__dirname, '..', '..', 'uploads', 'covers');
    fs.mkdirSync(destPath, { recursive: true });
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, file.originalname);
      const fileName = `cover-${hash.toString('hex')}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    });
  }
});

// 3. Storage das Páginas (Aqui está a correção!)
const storagePages = multer.diskStorage({
  destination: (req, file, cb) => {
    let manga_id = req.params.manga_id;
    let capitulo_id = req.params.capitulo_id;

    // Se o Express falhar no req.params, fatiamos a URL: /upload/page/1/1/1
    if (!manga_id || !capitulo_id) {
      const urlParts = req.originalUrl.split('/');
      manga_id = urlParts[3];    // Pega o ID do mangá
      capitulo_id = urlParts[4]; // Pega o ID do capítulo
    }

    if (!manga_id || !capitulo_id) {
      return cb(new Error('ID do mangá ou do capítulo não fornecido!'), '');
    }

    // Monta a estrutura organizada de pastas: uploads/pages/manga_1/capitulo_1
    const destPath = path.resolve(__dirname, '..', '..', 'uploads', 'pages', `manga_${manga_id}`, `capitulo_${capitulo_id}`);
    
    // O recursive: true força a criação de todas as pastas necessárias no caminho
    fs.mkdirSync(destPath, { recursive: true });
    
    cb(null, destPath);
  },
  filename: (req, file, cb) => {
    crypto.randomBytes(16, (err, hash) => {
      if (err) cb(err, file.originalname);
      
      let numero_pagina = req.params.numero_pagina;
      if (!numero_pagina) {
          const urlParts = req.originalUrl.split('/');
          numero_pagina = urlParts[5]; // Pega o número da página da URL
      }

      // Nomeia a página bonitinho: page-1-1774839234243.jpg
      const fileName = `page-${numero_pagina || hash.toString('hex')}-${Date.now()}${path.extname(file.originalname)}`;
      cb(null, fileName);
    });
  }
});

export const uploadCover = multer({ storage: storageCover, fileFilter: imageFileFilter });
export const uploadPages = multer({ storage: storagePages, fileFilter: imageFileFilter });
