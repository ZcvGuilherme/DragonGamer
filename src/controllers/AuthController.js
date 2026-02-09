import Pessoa from '../database/models/Pessoa.js';

class AuthController {

  async login(req, res) {
    const { matricula, senha } = req.body;

    if (!matricula || !senha) {
      return res.status(400).json({ error: 'Matrícula e senha são obrigatórias' });
    }

    try {
      const pessoa = await Pessoa.findOne({ where: { matricula } });

      if (!pessoa || pessoa.senha !== senha) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
      }

      return res.json({
        id: pessoa.id,
        nome: pessoa.nome,
        matricula: pessoa.matricula,
        role: pessoa.role
      });

    } catch (error) {
      return res.status(500).json({ error: 'Erro ao realizar login' });
    }
  }

}

export default new AuthController();
