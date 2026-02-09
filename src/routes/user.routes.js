import { Router } from 'express';
import UserController from '../controllers/UserController.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';

const router = Router();

router.get(
    '/locacoes/ativas/:pessoaId',
    authorizeRole('USER'),
    UserController.locacoesAtivas
);

router.get(
    '/locacoes/historico/:pessoaId',
    authorizeRole('USER'),
    UserController.historicoLocacoes
);

export default router;
