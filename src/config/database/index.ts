import { Sequelize } from 'sequelize';

// Crie a instância do Sequelize com os dados do seu MySQL
// Substitua 'root' e 'sua_senha' pelos dados reais do seu banco local
const db = new Sequelize('kumoko_scan', 'root', 'sua_senha', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false, // Deixa false para não poluir seu terminal com os comandos SQL
});

const startDB = async () => {
  try {
    await db.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
    
    // O sync cria as tabelas no banco se elas não existirem
    await db.sync(); 
    console.log('Modelos sincronizados!');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
};

startDB();

export default db;