import sequelize from '../index.js';

import Pessoa from './Pessoa.js';
import Jogo from './Jogo.js';
import Locacao from './Locacao.js';

// Pessoa -> Locacao
Pessoa.hasMany(Locacao, { foreignKey: 'pessoaId' });
Locacao.belongsTo(Pessoa, { foreignKey: 'pessoaId' });

// Jogo -> Locacao
Jogo.hasMany(Locacao, { foreignKey: 'jogoId' });
Locacao.belongsTo(Jogo, { foreignKey: 'jogoId' });

export {
  sequelize,
  Pessoa,
  Jogo,
  Locacao
};

