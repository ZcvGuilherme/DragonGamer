import { Pessoa, Jogo, Locacao } from '../database/models/index.js';

class AdminController {

  async criarLocacao(req, res) {
    const { pessoaId, jogoId, dataEntregaPrevista } = req.body;

    try {
      const pessoa = await Pessoa.findByPk(pessoaId);
      if (!pessoa) {
        return res.status(404).json({ error: 'Pessoa não encontrada' });
      }

      const jogo = await Jogo.findByPk(jogoId);
      if (!jogo || jogo.status !== 'DISPONIVEL') {
        return res.status(400).json({ error: 'Jogo indisponível' });
      }

      const locacao = await Locacao.create({
        pessoaId,
        jogoId,
        dataInicio: new Date(),
        dataEntregaPrevista
      });

      jogo.status = 'INDISPONIVEL';
      await jogo.save();

      return res.status(201).json(locacao);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar locação' });
    }
  }

  async finalizarLocacao(req, res) {
    const { id } = req.params;

    try {
      const locacao = await Locacao.findByPk(id, { include: Jogo });

      if (!locacao) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      if (locacao.dataEntregaReal) {
        return res.status(400).json({ error: 'Locação já finalizada' });
      }

      const dataEntregaReal = new Date();
      const prevista = new Date(locacao.dataEntregaPrevista);

      let multa = 0;

      if (dataEntregaReal > prevista) {
        const diffTime = dataEntregaReal - prevista;
        const diasAtraso = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        multa = diasAtraso * 5;
      }

      locacao.dataEntregaReal = dataEntregaReal;
      locacao.multa = multa;
      await locacao.save();

      locacao.Jogo.status = 'DISPONIVEL';
      await locacao.Jogo.save();

      return res.json(locacao);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao finalizar locação' });
    }
  }
}

export default new AdminController();
