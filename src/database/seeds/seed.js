import { sequelize, Pessoa, Jogo } from '../models/index.js';

async function runSeeds() {
  try {
    await sequelize.sync();

    // Pessoas
    const admin = await Pessoa.findOrCreate({
      where: { matricula: 'ADM001' },
      defaults: {
        nome: 'Administrador',
        senha: '123456',
        role: 'ADMIN'
      }
    });

    const user = await Pessoa.findOrCreate({
      where: { matricula: 'USR001' },
      defaults: {
        nome: 'Usuário Teste',
        senha: '123456',
        role: 'USER'
      }
    });

    // Jogos
    const jogos = [
      'God of War',
      'Elden Ring',
      'The Witcher 3',
      'Red Dead Redemption 2'
    ];

    for (const nome of jogos) {
      await Jogo.findOrCreate({
        where: { nome }
      });
    }

    console.log('Seeds executadas com sucesso');
    process.exit(0);

  } catch (error) {
    console.error('Erro ao executar seeds:', error);
    process.exit(1);
  }
}

runSeeds();
