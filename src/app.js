import express from 'express';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import userRoutes from './routes/user.routes.js';
import jogoRoutes from './routes/jogo.routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors());

// Configuração do EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin/jogos', jogoRoutes);
app.use('/api/jogos', jogoRoutes);
app.use('/api/user', userRoutes);

// Rotas de View
app.get('/', (req, res) => res.render('login'));
app.get('/login', (req, res) => res.render('login'));
app.get('/admin', (req, res) => res.render('admin/index'));
app.get('/admin/jogos', (req, res) => res.render('admin/jogos'));
app.get('/admin/pessoas', (req, res) => res.render('admin/pessoas'));
app.get('/user', (req, res) => res.render('user/dashboard'));
app.get('/user/dashboard', (req, res) => res.render('user/dashboard'));

app.get('/user/jogos', (req, res) => {
  res.render('user/jogos');
});

export default app;
