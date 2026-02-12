# DragonGamer

Sistema fullstack para gerenciamento de uma locadora de jogos, desenvolvido como projeto acadêmico em equipe.

O aplicativo oferece uma plataforma completa com dois perfis de usuário: **Admin** (gerenciador do sistema) e **Usuário** (cliente). O foco principal é implementar regras de negócio robustas para gerenciamento de usuários, locação, devolução e cálculo automático de multas por atraso.

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Express.js v5.2.1** - Framework web
- **SQLite** - Banco de dados relacional
- **Sequelize v6.37.7** - ORM (Object-Relational Mapping)
- **EJS v4.0.1** - Template engine para views
- **ES Modules** - Módulos ECMAScript
- **CORS v2.8.6** - Controle de requisições cross-origin
- **PDFKit v0.17.2** - Geração de PDFs

## Funcionalidades

### Perfil Admin

- **Gerenciamento de Usuários**: CRUD completo (criar, listar, atualizar, deletar)
- **Gerenciamento de Jogos**: CRUD completo com controle de disponibilidade
- **Gerenciamento de Locações**: Criar, visualizar, atualizar e deletar locações
- **Devolução de Locações**: Finalizá-las com cálculo automático de multas
- **Controle de Disponibilidade**: Marcar jogos como disponíveis ou indisponíveis

### Perfil Usuário

- **Listar Jogos**: Visualizar todos os jogos disponíveis
- **Locações Ativas**: Acompanhar locações em andamento
- **Histórico de Locações**: Consultar todas as locações passadas
- **Dashboard**: Visualizar informações e resumo pessoal

## Modelos de Dados

### Pessoa
- `id` - Identificador único
- `nome` - Nome do usuário
- `matricula` - Matrícula única (utilizada no login)
- `senha` - Senha de acesso
- `role` - Tipo de usuário (ADMIN | USER)
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Jogo
- `id` - Identificador único
- `nome` - Nome do jogo
- `ano` - Ano de lançamento
- `categoria` - Categoria/gênero
- `capaUrl` - URL da capa
- `status` - Status (DISPONIVEL | INDISPONIVEL)
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

### Locação
- `id` - Identificador único
- `pessoaId` - ID da pessoa que locou
- `jogoId` - ID do jogo locado
- `dataInicio` - Data de início da locação
- `dataEntregaPrevista` - Data prevista de entrega
- `dataEntregaReal` - Data real de entrega
- `multa` - Valor da multa (se houver atraso)
- `createdAt` - Data de criação
- `updatedAt` - Data de atualização

## Autenticação e Autorização

- **Autenticação**: Login por matrícula e senha
- **Autorização**: Controle de acesso via middleware por role (ADMIN/USER)
- **Headers de Autorização**: 
  ```
  x-role - Tipo de usuário (ADMIN | USER)
  x-user-id - ID do usuário autenticado
  ```

## Estrutura do Projeto

```
DragonGamer/
├── src/
│   ├── controllers/
│   │   ├── AdminController.js      # Lógica de admin
│   │   ├── AuthController.js       # Autenticação
│   │   ├── JogoController.js       # Gerenciamento de jogos
│   │   └── UserController.js       # Funcionalidades do usuário
│   ├── database/
│   │   ├── index.js                # Configuração do banco
│   │   ├── models/
│   │   │   ├── Jogo.js             # Modelo de jogo
│   │   │   ├── Locacao.js          # Modelo de locação
│   │   │   └── Pessoa.js           # Modelo de pessoa/usuário
│   │   └── seeds/
│   │       ├── seedJogos.js        # Seeds de jogos
│   │       └── seedPessoas.js      # Seeds de usuários
│   ├── middlewares/
│   │   └── authorizeRole.js        # Middleware de autorização
│   ├── routes/
│   │   ├── admin.routes.js         # Rotas de admin
│   │   ├── auth.routes.js          # Rotas de autenticação
│   │   ├── jogo.routes.js          # Rotas de jogos
│   │   └── user.routes.js          # Rotas de usuários
│   ├── views/
│   │   ├── login.ejs               # Página de login
│   │   ├── admin/
│   │   │   ├── index.ejs           # Dashboard admin
│   │   │   ├── jogos.ejs           # Gerenciamento de jogos
│   │   │   └── pessoas.ejs         # Gerenciamento de usuários
│   │   └── user/
│   │       ├── dashboard.ejs       # Dashboard do usuário
│   │       └── jogos.ejs           # Lista de jogos
│   ├── app.js                      # Configuração da aplicação
│   └── server.js                   # Ponto de entrada do servidor
├── public/
│   └── css/
│       └── style.css               # Estilos da aplicação
├── package.json                    # Dependências do projeto
└── README.md                       # Este arquivo
```

## Principais Rotas

### Autenticação
```
POST /api/auth/login - Realizar login
```

### Jogos
```
GET /api/jogos - Listar todos os jogos
GET /api/admin/jogos - Listar jogos (Admin)
POST /api/admin/jogos - Criar novo jogo (Admin)
PUT /api/admin/jogos/:id - Atualizar jogo (Admin)
DELETE /api/admin/jogos/:id - Deletar jogo (Admin)
```

### Usuários (Admin)
```
POST /api/admin/usuarios - Criar novo usuário (Admin)
GET /api/admin/usuarios - Listar todos os usuários (Admin)
PUT /api/admin/usuarios/:id - Atualizar usuário (Admin)
DELETE /api/admin/usuarios/:id - Deletar usuário (Admin)
```

### Locações
```
GET /api/admin/locacoes - Listar todas as locações (Admin)
POST /api/admin/locacoes - Criar nova locação (Admin)
PUT /api/admin/locacoes/:id - Atualizar locação (Admin)
PUT /api/admin/locacoes/:id/devolucao - Finalizar locação com devolução (Admin)
DELETE /api/admin/locacoes/:id - Deletar locação (Admin)
GET /api/user/locacoes/ativas - Listar locações ativas do usuário (User)
GET /api/user/locacoes/historico - Visualizar histórico de locações (User)
```

### Usuário
```
GET /api/user/dashboard - Dados do dashboard (User)
GET /api/user/jogos - Listar jogos disponíveis (User)
```

### Views
```
GET / - Página de login
GET /login - Página de login
GET /admin - Dashboard admin
GET /admin/jogos - Gerenciamento de jogos (Admin)
GET /admin/pessoas - Gerenciamento de usuários (Admin)
GET /user - Dashboard do usuário
GET /user/dashboard - Dashboard do usuário
GET /user/jogos - Lista de jogos para aluguel (User)
```

## Como Executar

### 1. Instalar dependências

```sh
npm install
```

### 2. Executar seeds (cria banco e dados iniciais)

```sh
npm run seed
```

### 3. Subir o servidor em modo desenvolvimento

```sh
npm run dev
```

O servidor estará disponível em:
```
http://localhost:3000
```

### Scripts disponíveis

```json
{
  "dev": "node src/server.js",        // Inicia o servidor
  "seed": "node src/database/seeds/index.js"  // Executa as seeds
}
```

## Banco de Dados

- **SQLite** gerado localmente na raiz do projeto
- Seeds **idempotentes** (podem ser executadas múltiplas vezes com segurança)
- Cria dados iniciais de teste para facilitar o desenvolvimento

## Notas

- O projeto utiliza **ES Modules** (`"type": "module"` em package.json)
- Todas as rotas da API estão prefixadas com `/api`
- O middleware `authorizeRole` valida permissões por role
- Multas são calculadas automaticamente na devolução de locações com atraso

## Projeto Acadêmico

Desenvolvido de forma incremental, feature a feature, com separação clara de responsabilidades, padrões de código e boas práticas de organização de projeto.

## Equipe

Projeto desenvolvido como trabalho acadêmico em equipe com foco em arquitetura clean, segurança e escalabilidade.