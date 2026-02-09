import { Router } from 'express';
import AdminController from '../controllers/AdminController.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.post(
    '/locacoes',
    authorizeRole('ADMIN'),
    AdminController.criarLocacao
);

router.put(
    '/locacoes/:id/devolucao',
    authorizeRole('ADMIN'),
    AdminController.finalizarLocacao
);

export default router;
