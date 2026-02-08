import express from 'express';
import { sequelize } from './database/models/index.js';

const app = express();

app.use(express.json());

sequelize.sync({ alter: true })
  .then(() => console.log('Banco sincronizado'))
  .catch(console.error);

export default app;

