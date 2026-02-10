import Jogo from '../models/Jogo.js';

export async function seedJogos() {
  const jogos = [
    {
      nome: 'The Legend of Zelda',
      ano: 1986,
      categoria: 'Aventura',
      capaUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Zelda_Logo.svg/1920px-Zelda_Logo.svg.png'
    },
    {
      nome: 'Hollow Knight',
      ano: 2017,
      categoria: 'Plataforma',
      capaUrl: 'https://upload.wikimedia.org/wikipedia/pt/a/a1/Hollow_Knight_Cover.jpg'
    },
    {
      nome: 'Celeste',
      ano: 2018,
      categoria: 'Plataforma',
      capaUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Celeste_box_art_cropped.png'
    },
    {
      nome: 'God of War',
      ano: 2018,
      categoria: 'Ação',
      capaUrl: 'https://upload.wikimedia.org/wikipedia/pt/4/4b/God_of_War_2018_logo.png'
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
