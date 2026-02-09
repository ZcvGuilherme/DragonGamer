import { Router } from 'express';
import AdminController from '../controllers/AdminController.js';

const router = Router();

router.post('/locacoes', AdminController.criarLocacao);
router.put('/locacoes/:id/devolucao', AdminController.finalizarLocacao);

export default router;
