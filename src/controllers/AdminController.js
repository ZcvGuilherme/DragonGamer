import { Pessoa, Jogo, Locacao } from '../database/models/index.js';

class AdminController {
  async criarUsuario(req, res) {
    const { nome, matricula, senha, role } = req.body;

    try {
      if (!nome || !matricula || !senha) {
        return res.status(400).json({
          error: 'Nome, matrícula e senha são obrigatórios'
        });
      }

      const usuarioExistente = await Pessoa.findOne({
        where: { matricula }
      });

      if (usuarioExistente) {
        return res.status(400).json({
          error: 'Matrícula já cadastrada'
        });
      }

      const novoUsuario = await Pessoa.create({
        nome,
        matricula,
        senha,
        role: role || 'USER'
      });

      return res.status(201).json({
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        matricula: novoUsuario.matricula,
        role: novoUsuario.role
      });

    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao criar usuário'
      });
    }
  }

  async listarUsuarios(req, res) {
    try {
      const usuarios = await Pessoa.findAll({
        attributes: ['id', 'nome', 'matricula', 'role'],
        order: [['createdAt', 'DESC']]
      });

      return res.json(usuarios);

    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao listar usuários'
      });
    }
  }

  async atualizarUsuario(req, res) {
    const { id } = req.params;
    const { nome, matricula, senha, role } = req.body;

    try {
      const usuario = await Pessoa.findByPk(id);

      if (!usuario) {
        return res.status(404).json({
          error: 'Usuário não encontrado'
        });
      }

      if (matricula && matricula !== usuario.matricula) {
        const matriculaExistente = await Pessoa.findOne({
          where: { matricula }
        });

        if (matriculaExistente) {
          return res.status(400).json({
            error: 'Matrícula já cadastrada'
          });
        }
      }

      usuario.nome = nome ?? usuario.nome;
      usuario.matricula = matricula ?? usuario.matricula;
      usuario.role = role ?? usuario.role;

      if (senha) {
        usuario.senha = senha;
      }

      await usuario.save();

      return res.json({
        id: usuario.id,
        nome: usuario.nome,
        matricula: usuario.matricula,
        role: usuario.role
      });

    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao atualizar usuário'
      });
    }
  }

  async deletarUsuario(req, res) {
    const { id } = req.params;

    try {
      const usuario = await Pessoa.findByPk(id);

      if (!usuario) {
        return res.status(404).json({
          error: 'Usuário não encontrado'
        });
      }

      await usuario.destroy();

      return res.status(204).send();

    } catch (error) {
      return res.status(500).json({
        error: 'Erro ao excluir usuário'
      });
    }
  }

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
      
      // Normalizar datas para comparação (ignorar horário e timezone)
      const hoje = new Date(dataEntregaReal.getFullYear(), dataEntregaReal.getMonth(), dataEntregaReal.getDate());
      const prevista = new Date(locacao.dataEntregaPrevista);
      const dataPrevista = new Date(prevista.getFullYear(), prevista.getMonth(), prevista.getDate());

      let multa = 0;

      if (hoje > dataPrevista) {
        const diffTime = hoje - dataPrevista;
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

  async listarLocacoes(req, res) {
    try {
      const locacoes = await Locacao.findAll({
        include: [Pessoa, Jogo],
        order: [['createdAt', 'DESC']]
      });

      return res.json(locacoes);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao listar locações' });
    }
  }

  async atualizarLocacao(req, res) {
    const { id } = req.params;
    const { dataEntregaPrevista } = req.body;

    try {
      const locacao = await Locacao.findByPk(id);

      if (!locacao) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      locacao.dataEntregaPrevista = dataEntregaPrevista;
      await locacao.save();

      return res.json(locacao);

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao atualizar locação' });
    }
  }

  async deletarLocacao(req, res) {
    const { id } = req.params;

    try {
      const locacao = await Locacao.findByPk(id);

      if (!locacao) {
        return res.status(404).json({ error: 'Locação não encontrada' });
      }

      await locacao.destroy();

      return res.status(204).send();

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao excluir locação' });
    }
  }
}

export default new AdminController();
