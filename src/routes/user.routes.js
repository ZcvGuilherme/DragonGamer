// user.routes.js
import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.get(
  '/locacoes/ativas',
  authorizeRole('USER'),
  UserController.locacoesAtivas
);

router.get(
  '/locacoes/historico',
  authorizeRole('USER'),
  UserController.historicoLocacoes
);

router.get(
  '/dashboard',
  authorizeRole('USER'),
  UserController.dashboard
);

router.get(
  '/jogos',
  authorizeRole('USER'),
  UserController.listarJogos
);

export default router;
