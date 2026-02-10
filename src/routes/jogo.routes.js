import { Router } from 'express';
import JogoController from '../controllers/JogoController.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.get(
  '/disponiveis',
  authorizeRole('USER', 'ADMIN'),
  JogoController.listarDisponiveis
);

router.get(
  '/',
  authorizeRole('USER', 'ADMIN'),
  JogoController.listar
);

router.post(
  '/',
  authorizeRole('ADMIN'),
  JogoController.criar
);

router.put(
  '/:id',
  authorizeRole('ADMIN'),
  JogoController.atualizar
);

router.delete(
  '/:id',
  authorizeRole('ADMIN'),
  JogoController.deletar
);

export default router;
