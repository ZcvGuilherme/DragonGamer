import Pessoa from '../models/Pessoa.js';

export async function seedPessoas() {
  const pessoas = [
    {
      nome: 'Administrador',
      matricula: 'ADM001',
      senha: '123456',
      role: 'ADMIN'
    },
    {
      nome: 'Usuário Padrão',
      matricula: 'USR001',
      senha: '123456',
      role: 'USER'
    }
  ];

  for (const pessoa of pessoas) {
    await Pessoa.findOrCreate({
      where: { matricula: pessoa.matricula },
      defaults: pessoa
    });
  }

  console.log('✔ Pessoas seedadas');
}
