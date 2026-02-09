import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Jogo = sequelize.define('Jogo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  status: {
    type: DataTypes.ENUM('DISPONIVEL', 'INDISPONIVEL'),
    defaultValue: 'DISPONIVEL'
  }
});

export default Jogo;

