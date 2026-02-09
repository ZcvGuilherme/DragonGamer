import Jogo from '../database/models/Jogo.js';

class JogoController {

  async criar(req, res) {
    const { nome } = req.body;

    if (!nome) {
      return res.status(400).json({ error: 'Nome do jogo é obrigatório' });
    }

    try {
      const jogo = await Jogo.create({ nome });
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

}

export default new JogoController();
