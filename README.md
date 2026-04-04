# Rocketlog

API REST de gestão de entregas e rastreamento de pedidos desenvolvida durante o curso Full Stack da Rocketseat.

O projeto resolve o fluxo de cadastro de usuários, autenticação, criação de entregas, atualização de status e consulta de histórico de logs, permitindo acompanhar o ciclo de vida de uma encomenda do início ao fim com uma API construída em Node.js, TypeScript, Express, Prisma e PostgreSQL.

## Sobre o projeto

O Rocketlog foi pensado para simular um cenário real de operação logística, onde usuários autenticados podem acompanhar entregas e registrar eventos de status ao longo do processo. A ideia é demonstrar domínio de backend, modelagem de dados, autenticação, autorização e testes automatizados em um contexto prático.

## Funcionalidades

- Cadastro de usuários
- Autenticação com JWT
- Autorização por perfil de acesso
- Criação e listagem de entregas
- Atualização de status de entrega
- Registro e consulta de logs de entrega
- Testes automatizados com Jest e Supertest

## Stack

- Node.js
- TypeScript
- Express
- Prisma
- PostgreSQL
- Jest
- Supertest
- Zod

## Requisitos

- Node.js instalado
- Docker e Docker Compose para subir o banco local
- Um arquivo `.env` configurado a partir de `.env-example`

## Variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com base em `.env-example`:

```env
DATABASE_URL=
JWT_SECRET=
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
```

## Como rodar o projeto

1. Suba o banco de dados local:

```bash
docker compose up -d
```

2. Instale as dependências:

```bash
npm install
```

3. Execute as migrations:

```bash
npx prisma migrate dev
```

4. Inicie a API:

```bash
npm run dev
```

O servidor sobe em `http://localhost:3333`.

## Testes

```bash
npm test
```

Para rodar os testes em modo watch:

```bash
npm run test:dev
```

## Prisma Studio com banco de teste

```bash
npm run prisma:studio:test
```

## Scripts disponíveis

- `npm run dev`: inicia a aplicação em modo desenvolvimento
- `npm test`: executa os testes
- `npm run test:dev`: executa os testes em watch
- `npm run prisma:studio:test`: abre o Prisma Studio apontando para o banco de testes

## Rotas principais

### Usuários

- `POST /users`

### Sessões

- `POST /sessions`

### Entregas

- `POST /deliveries`
- `GET /deliveries`
- `PATCH /deliveries/:id/status`

### Logs de entrega

- `POST /delivery-logs`
- `GET /delivery-logs/:delivery_id/show`

## Observações de acesso

- `POST /deliveries`, `GET /deliveries`, `PATCH /deliveries/:id/status` exigem autenticação.
- As rotas de entregas e logs também dependem de autorização por perfil.
- Usuários com perfil `sale` têm acesso às rotas administrativas.
- Usuários com perfil `customer` têm acesso ao fluxo de consulta permitido pelo sistema.

## Estrutura básica

```text
src/
  controllers/
  middlewares/
  routes/
  database/
  tests/
prisma/
```

## Observação

Este projeto foi desenvolvido como parte do curso Full Stack da Rocketseat e adaptado para o seu portfólio como API de backend para gestão de entregas.

## Autor

Lucas Moura
