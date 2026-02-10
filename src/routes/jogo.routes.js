import { Router } from 'express';
import JogoController from '../controllers/JogoController.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.post(
  '/',
  authorizeRole('ADMIN'),
  JogoController.criar
);

router.get(
  '/',
  authorizeRole('ADMIN'),
  JogoController.listar
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
