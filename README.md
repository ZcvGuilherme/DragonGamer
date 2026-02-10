# DragonGamer

Sistema fullstack para gerenciamento de uma locadora de jogos, desenvolvido como projeto acadêmico em equipe.

O sistema possui dois perfis: Admin e Usuário, com foco nas regras de negócio de locação de jogos.

## Tecnologias

- Node.js
- Express
- SQLite
- Sequelize
- EJS
- ES Modules

## Perfis

Admin

- CRUD completo de jogos
- Criar e finalizar locações
- Controle de disponibilidade
- Cálculo automático de multas

Usuário

- Listar jogos disponíveis
- Visualizar locações ativas
- Consultar histórico e multas

## Modelos Principais

Pessoa

- nome
- matrícula
- senha
- role (ADMIN | USER)

Jogo

- nome
- ano
- categoria
- capaUrl
- status (DISPONIVEL | INDISPONIVEL)

Locação

- pessoaId
- jogoId
- dataInicio
- dataEntregaPrevista
- dataEntregaReal
- multa

## Autenticação e Autorização

- Login por matrícula e senha
- Controle de acesso via middleware por role

Headers utilizados:

```
x-role
x-user-id
```

## Principais Rotas

```
POST /auth/login

GET /jogos

GET /jogos/disponiveis

POST /admin/jogos

PUT /admin/jogos/:id

DELETE /admin/jogos/:id

POST /admin/locacoes

PUT /admin/locacoes/:id/devolucao

GET /user/locacoes/ativas

GET /user/locacoes/historico
```

## Execução

1. Instalar dependências

```sh
npm install
```

2. Executar seeds (cria banco e dados iniciais)
```sh
npm run seed
```

3. Subir o servidor
```sh
npm run dev
```

Servidor padrão:

```
http://localhost:3000
```

## Observações

- Banco SQLite gerado localmente
- Seeds idempotentes

## Projeto Acadêmico

Desenvolvido de forma incremental, feature a feature, com separação clara de responsabilidades e boas práticas de organização.