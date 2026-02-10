import Jogo from '../models/Jogo.js';

export async function seedJogos() {
  const jogos = [
    {
      nome: 'The Legend of Zelda',
      ano: 1986,
      categoria: 'Aventura',
      capaUrl: 'https://example.com/zelda.jpg'
    },
    {
      nome: 'Hollow Knight',
      ano: 2017,
      categoria: 'Plataforma',
      capaUrl: 'https://example.com/hollow-knight.jpg'
    },
    {
      nome: 'Celeste',
      ano: 2018,
      categoria: 'Plataforma',
      capaUrl: 'https://example.com/celeste.jpg'
    },
    {
      nome: 'God of War',
      ano: 2018,
      categoria: 'Ação',
      capaUrl: 'https://example.com/god-of-war.jpg'
    }
  ];

  for (const jogo of jogos) {
    await Jogo.findOrCreate({
      where: { nome: jogo.nome },
      defaults: jogo
    });
  }

  console.log('✔ Jogos seedados');
}
