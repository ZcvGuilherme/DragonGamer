import app from './app.js';
import { sequelize } from './database/models/index.js';

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Banco conectado');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();
