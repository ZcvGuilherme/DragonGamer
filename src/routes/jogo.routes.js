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

export default router;
