import PDFDocument from 'pdfkit';
import { Router } from 'express';
import AdminController from '../controllers/AdminController.js';
import { authorizeRole } from '../middlewares/authorizeRole.js';
import { Locacao, Pessoa, Jogo } from '../database/models/index.js';

const router = Router();

router.post(
  '/usuarios',
  authorizeRole('ADMIN'),
  AdminController.criarUsuario
);

router.get(
  '/usuarios',
  authorizeRole('ADMIN'),
  AdminController.listarUsuarios
);

router.put(
  '/usuarios/:id',
  authorizeRole('ADMIN'),
  AdminController.atualizarUsuario
);

router.delete(
  '/usuarios/:id',
  authorizeRole('ADMIN'),
  AdminController.deletarUsuario
);

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

 // Gerar o relatório
router.get('/relatorio', async (req, res) => {
  const locacoes = await Locacao.findAll({
    include: [Pessoa, Jogo]
  });

  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=relatorio.pdf');

  doc.pipe(res);

  doc.fontSize(18).text('Relatório DragonGamer', { align: 'center' });
  doc.moveDown();

locacoes.forEach(loc => {

  const nomePessoa = loc.Pessoa ? loc.Pessoa.nome : 'Usuário removido';
  const nomeJogo = loc.Jogo ? loc.Jogo.nome : 'Jogo removido';
  const status = loc.dataEntregaReal ? 'Finalizada' : 'Ativa';

  const formatarData = (dataISO) => {
    if (!dataISO) return 'N/A';
    const dataStr = dataISO.toISOString().split('T')[0];
    const [ano, mes, dia] = dataStr.split('-');
    return `${dia}/${mes}/${ano}`;
  };

  doc.fontSize(12).text(`Jogo: ${nomeJogo}`);
  doc.text(`Pessoa: ${nomePessoa}`);
  doc.text(`Status: ${status}`);
  doc.text(`Início: ${formatarData(loc.dataInicio)}`);
  doc.text(`Entrega Prevista: ${formatarData(loc.dataEntregaPrevista)}`);
  doc.text(`Multa: R$ ${loc.multa || '0.00'}`);
  
  doc.moveDown(); // espaço entre registros
});

  doc.end();

});

export default router;
