import { sequelize } from '../models/index.js';
import { seedPessoas } from './seedPessoas.js';
import { seedJogos } from './seedJogos.js';

async function runSeeds() {
  try {
    await sequelize.sync();
    await seedPessoas();
    await seedJogos();
    console.log('🌱 Seeds executadas com sucesso');
    process.exit();
  } catch (error) {
    console.error('Erro ao rodar seeds:', error);
    process.exit(1);
  }
}

runSeeds();
