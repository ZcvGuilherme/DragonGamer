import app from './app.js';
import { sequelize } from './database/models/index.js';

const PORT = 3000;
const HOST = '0.0.0.0';

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Banco conectado');

    app.listen(PORT, () => {
      console.log(`Servidor rodando em http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();
