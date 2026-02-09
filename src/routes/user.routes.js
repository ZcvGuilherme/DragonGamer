import { Router } from 'express';
import UserController from '../controllers/UserController.js';

const router = Router();

router.get('/locacoes/ativas/:pessoaId', UserController.locacoesAtivas);
router.get('/locacoes/historico/:pessoaId', UserController.historicoLocacoes);

export default router;
