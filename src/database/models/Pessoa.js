import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Pessoa = sequelize.define('Pessoa', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },

  matricula: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  senha: {
    type: DataTypes.STRING,
    allowNull: false
  },

  role: {
    type: DataTypes.ENUM('ADMIN', 'USER'),
    defaultValue: 'USER'
  }
});

export default Pessoa;

