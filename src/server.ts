import express from "express";
import cors from "cors";
import path from 'path';
import uploadRoutes from './routes/upload';

// 1. Inicializa o Express
const app = express();

// 2. Configura os middlewares
app.use(cors()); // Permite requisições de outros domínios
app.use(express.json()); // Habilita o parsing de JSON no corpo das requisições

// 3. Rota para servir os arquivos de imagem que foram upados
// As imagens salvas em 'uploads' ficarão acessíveis pela URL '/files'
// Ex: http://localhost:3000/files/covers/cover-1-timestamp.png
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));

// 4. Rota principal da API
app.get("/", (req, res) => {
  res.json({ message: "API Kumoko funcionando" });
});

// 5. Rotas de Upload
// As rotas definidas em './routes/upload' serão acessíveis sob o prefixo '/upload'
// Ex: POST http://localhost:3000/upload/cover
app.use('/upload', uploadRoutes);

// 6. Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});