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

export default router;
