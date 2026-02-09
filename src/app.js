import express from 'express';
import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import userRoutes from './routes/user.routes.js';
import jogoRoutes from './routes/jogo.routes.js';

const app = express();

app.use(express.json());

app.use('/auth', authRoutes)
app.use('/admin', adminRoutes);
app.use('/admin/jogos', jogoRoutes);
app.use('/user', userRoutes);

export default app;
