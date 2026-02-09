import { DataTypes } from 'sequelize';
import sequelize from '../index.js';

const Locacao = sequelize.define('Locacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  dataInicio: {
    type: DataTypes.DATE,
    allowNull: false
  },

  dataEntregaPrevista: {
    type: DataTypes.DATE,
    allowNull: false
  },

  dataEntregaReal: {
    type: DataTypes.DATE,
    allowNull: true
  },

  multa: {
    type: DataTypes.FLOAT,
    defaultValue: 0
  }
});

export default Locacao;

