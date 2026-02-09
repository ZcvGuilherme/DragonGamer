# DragonGamer 🎮

Aplicação web **fullstack** para gerenciamento de uma **locadora de jogos**, desenvolvida como projeto acadêmico em equipe.

O sistema permite que um **admin** gerencie jogos e locações, enquanto o **usuário** pode acompanhar seus jogos locados, histórico e possíveis multas por atraso.

---

## 🧠 Visão Geral

O núcleo do sistema é a **Locação**, responsável por relacionar:

* Pessoa (usuário)
* Jogo
* Datas de locação/devolução
* Multa por atraso

Toda regra de negócio gira em torno dessa entidade.

---

## 🛠️ Tecnologias Utilizadas

* **Node.js**
* **Express**
* **SQLite**
* **Sequelize (ORM)**
* **EJS**
* **ES Modules** (`type: module`)

---

## 👥 Perfis de Usuário

### Admin

* Cadastrar jogos
* Criar locações
* Finalizar locações (devolução)
* Calcular multas automaticamente

### Usuário

* Visualizar jogos locados
* Ver histórico de locações
* Consultar multas

---

## 🧩 Modelagem Principal

### Pessoa

* nome
* matrícula (login)
* senha
* role (`ADMIN` | `USER`)

### Jogo

* nome
* status (`DISPONIVEL` | `INDISPONIVEL`)

### Locação (núcleo)

* pessoaId
* jogoId
* dataInicio
* dataEntregaPrevista
* dataEntregaReal
* multa

---

## 🔐 Autenticação e Autorização

* Login simples por **matrícula + senha**
* Controle de acesso via **middleware por role**

Header utilizado:

```
x-role: ADMIN | USER
```

---

## 📂 Estrutura do Projeto

```
src/
 ├── app.js
 ├── server.js
 ├── controllers/
 ├── routes/
 ├── middlewares/
 ├── database/
 │    ├── index.js
 │    ├── models/
 │    └── seeds/
```

---

## 🌱 Seeds (Dados Iniciais)

O projeto utiliza **seeds via Sequelize**, sem CLI.

### Dados criados:

* 1 Admin
* 1 Usuário
* Jogos iniciais

Seeds são **idempotentes** (podem ser executadas várias vezes).

---

## ▶️ Como Executar o Projeto

### 1. Instalar dependências

```bash
npm install
```

### 2. Executar seeds (cria banco e dados iniciais)

```bash
npm run seed
```

### 3. Subir o servidor

```bash
npm run dev
```

Servidor padrão:

```
http://localhost:3000
```

---

## 🧪 Testes de API

Exemplo de login:

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{ "matricula": "ADM001", "senha": "123456" }'
```

Exemplo de criar locação (admin):

```bash
curl -X POST http://localhost:3000/admin/locacoes \
  -H "Content-Type: application/json" \
  -H "x-role: ADMIN" \
  -d '{ "pessoaId": 1, "jogoId": 1, "dataEntregaPrevista": "2026-02-20" }'
```

---

## ⚠️ Observações Importantes

* Banco é recriado localmente via seeds

---

## 📌 Próximas Evoluções (Opcional)

* JWT
* Middleware de identidade
* Migrations Sequelize
* Configuração de multa dinâmica
* Interface completa em EJS

---

## 👨‍💻 Projeto Acadêmico

Desenvolvido de forma incremental, **feature a feature**, respeitando divisão de tarefas e boas práticas de organização de código.
