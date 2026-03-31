import express from 'express';
import cors from 'cors';
import path from 'path';
import uploadRoutes from './routes/upload';
import mangaRoutes from './routes/manga';
import capituloRoutes from './routes/capitulo';

class App {
  public server: express.Application;

  constructor() {
    this.server = express(); // É aqui que ele estava reclamando!
    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
  }

  private routes() {
    this.server.use('/upload', uploadRoutes);
    this.server.use('/mangas', mangaRoutes);
    this.server.use('/capitulos', capituloRoutes);
  }
}

export default new App().server;