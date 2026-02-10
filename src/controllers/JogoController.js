import Jogo from '../database/models/Jogo.js';

class JogoController {

  async criar(req, res) {
    const {  nome, ano, categoria, capaUrl } = req.body;

    if (!nome || !ano || !categoria || !capaUrl) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    try {
      const jogo = await Jogo.create({
        nome,
        ano,
        categoria,
        capaUrl
      });
      return res.status(201).json(jogo);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao criar jogo' });
    }
  }

  async listar(req, res) {
    try {
      const jogos = await Jogo.findAll();
      return res.json(jogos);
    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar jogos' });
    }
  }

  async atualizar(req, res) {
    const { id } = req.params;
    const { nome, ano, categoria, capaUrl } = req.body;

    const jogo = await Jogo.findByPk(id);
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    if (jogo.status === 'INDISPONIVEL') {
      return res.status(400).json({
        error: 'Jogo em locação ativa'
      });
    }

    jogo.nome = nome ?? jogo.nome;
    jogo.ano = ano ?? jogo.ano;
    jogo.categoria = categoria ?? jogo.categoria;
    jogo.capaUrl = capaUrl ?? jogo.capaUrl;

    await jogo.save();
    return res.json(jogo);
  }

  async deletar(req, res) {
    const { id } = req.params;

    const jogo = await Jogo.findByPk(id);
    if (!jogo) {
      return res.status(404).json({ error: 'Jogo não encontrado' });
    }

    const possuiLocacoes = await Locacao.count({
      where: { jogoId: id }
    });

    if (possuiLocacoes > 0) {
      return res.status(400).json({
        error: 'Jogo possui histórico de locações'
      });
    }

    await jogo.destroy();
    return res.status(204).send();
  }
}

export default new JogoController();
