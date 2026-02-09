import { Locacao, Jogo } from '../database/models/index.js';
import { Op } from 'sequelize';

class UserController {

  async locacoesAtivas(req, res) {
    const { pessoaId } = req.params;

    try {
      const locacoes = await Locacao.findAll({
        where: {
          pessoaId,
          dataEntregaReal: null
        },
        include: {
          model: Jogo,
          attributes: ['id', 'nome']
        }
      });

      return res.json(locacoes);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar locações ativas' });
    }
  }

  async historicoLocacoes(req, res) {
    const { pessoaId } = req.params;

    try {
      const locacoes = await Locacao.findAll({
        where: {
          pessoaId,
          dataEntregaReal: { 
            [Op.ne]: null
          }
        },
        include: {
          model: Jogo,
          attributes: ['id', 'nome']
        }
      });

      return res.json(locacoes);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao buscar histórico' });
    }
  }

}

export default new UserController();
