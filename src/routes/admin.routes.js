import { Router } from 'express';
import AdminController from '../controllers/AdminController.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.get(
    '/locacoes',
    authorizeRole('ADMIN'),
    AdminController.listarLocacoes
);

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

router.put(
    '/locacoes/:id',
    authorizeRole('ADMIN'),
    AdminController.atualizarLocacao
);

router.delete(
    '/locacoes/:id',
    authorizeRole('ADMIN'),
    AdminController.deletarLocacao
);

export default router;
