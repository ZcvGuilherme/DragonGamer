import app from './app.js';
import { sequelize } from './database/models/index.js';

const PORT = 3000;

async function startServer() {
  try {
    await sequelize.sync({ alter: true });
    console.log('Banco sincronizado');

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar servidor:', error);
  }
}

startServer();
