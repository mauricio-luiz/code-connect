# Plano: backend de autenticação (apps/api)

## Context
A API é só o scaffold do Nest 12. O frontend já tem Login e Signup; falta o backend com 3 endpoints: cadastro, login (JWT) e dados do usuário logado, com Swagger (entradas e saídas). Persistência apenas em memória (array), sem ORM/banco.

Decisões já tomadas com o usuário:
- Auth via `@nestjs/authentication` (padrão atual da doc): guard global, `@Public()`, `@CurrentUser()`, `JwtBearerProvider`, `TokenService`, `PasswordHasher`.
- Rotas REST: `POST /users`, `POST /auth/tokens`, `GET /users/me`.

## Dependências (apps/api)
`@nestjs/authentication`, `@nestjs/swagger`, `zod` (v4.6, já implementa Standard JSON Schema, então o Swagger converte sem lib extra). O peer `@nestjs/websockets` e `@nestjs/microservices` do authentication será conferido na instalação (instalar só se exigido).

**Primeiro passo da implementação:** o pacote é 0.1.x e a doc de JWT foi lida só parcialmente. Depois de instalar, ler os `.d.ts` em `node_modules/@nestjs/authentication` para confirmar assinaturas exatas (`forRoot` com `accessToken`, `JwtBearerProvider.validate`, `TokenService.issue`, `PasswordHasher`) antes de escrever o código.

## Estrutura (módulos, imports com `.js`)
```
src/
  main.ts                 # Swagger (DocumentBuilder + addBearerAuth) em /docs; StandardSchemaValidationPipe global
  app.module.ts           # imports: AuthenticationModule.forRoot(...), UsersModule, AuthModule
  users/
    users.module.ts
    users.repository.ts   # array em memória: { id (randomUUID), name, email (lowercase), passwordHash, createdAt }; findById, findByEmail, create
    users.service.ts      # create (409 se email existe, hash com PasswordHasher), toPublic
    users.controller.ts   # POST /users (@Public, 201 + Location /users/me? ver abaixo), GET /users/me (@CurrentUser)
    users.schemas.ts      # zod: createUserSchema {name, email, password min 8}, userResponseSchema {id,name,email,createdAt}
    users.service.spec.ts, users.controller.spec.ts
  auth/
    auth.module.ts
    auth.controller.ts    # POST /auth/tokens (@Public) -> 201 { accessToken, tokenType:'Bearer', expiresIn }
    auth.service.ts       # verifica email/senha (PasswordHasher.verify, 401 genérico), emite JWT via TokenService
    jwt-auth.provider.ts  # extends JwtBearerProvider<User>, registra no AuthenticationRegistry, validate({sub}) -> UsersRepository.findById
    auth.schemas.ts       # zod: createTokenSchema {email, password}, tokenResponseSchema
    auth.service.spec.ts
test/
  auth.e2e-spec.ts        # fluxo completo via supertest
```
- Cadastro: `201` com corpo do usuário público (sem hash) e header `Location` apontando para `/users/me` (não existe `GET /users/:id` no escopo; o usuário só consulta a si mesmo). Email duplicado: `409`. Validação: `400` (padrão do pipe).
- Login: credenciais inválidas `401` com mensagem genérica. Resposta nunca expõe o hash.
- `GET /users/me`: protegido pelo guard global; sem token/token inválido `401`.
- Config JWT: `JWT_SECRET` via env (mín. 32 bytes), `ttl` 15m, issuer/audience fixos. Sem `.env` real no repo; adicionar `.env.example` e fallback apenas em testes (definido no setup do vitest/e2e). Sem `@nestjs/config` por ora (só `process.env`).
- Swagger: `@ApiTags`, `@ApiOperation`, `@ApiBody`/`@ApiCreatedResponse`/`@ApiConflictResponse`/`@ApiUnauthorizedResponse`/`@ApiBearerAuth` nos controllers; body vem de `@Body({ schema })` (convertido do Zod) e respostas documentadas com os schemas zod de resposta (se o conversor não cobrir saídas, usar classes de resposta simples com `@ApiProperty`).
- Armazenamento em memória é um provider singleton; dados somem ao reiniciar (documentar no README da API).

## Arquivos existentes a alterar
- [package.json](apps/api/package.json) (deps), [main.ts](apps/api/src/main.ts), [app.module.ts](apps/api/src/app.module.ts).
- `AppController`/`AppService` (Hello World) ficam; precisam de `@Public()` para o e2e atual continuar passando (ou ajustar o teste).
- CLAUDE.md: atualizar a seção Layout (API deixa de ser só scaffold) e mencionar Swagger em `/docs`.

## Testes unitários (obrigatórios, `*.spec.ts` colados ao código, Vitest, `vi.fn()`)
- `users.repository.spec.ts`: `create` gera id/createdAt, `findByEmail` case-insensitive, `findById` inexistente → `undefined`, instâncias isoladas (array não compartilhado entre testes).
- `users.service.spec.ts`: cria usuário com senha hasheada (hash ≠ senha), email normalizado, `409` em email duplicado, retorno público sem `passwordHash`.
- `users.controller.spec.ts`: `POST /users` delega ao service e define `Location`; `GET /users/me` devolve o usuário público do `@CurrentUser`.
- `auth.service.spec.ts`: credenciais válidas → emite token; email inexistente e senha errada → `401` com a mesma mensagem; nunca vaza hash.
- `jwt-auth.provider.spec.ts`: `validate({ sub })` retorna o usuário existente e rejeita/retorna vazio para `sub` desconhecido.
- `users.schemas.spec.ts` / `auth.schemas.spec.ts`: Zod aceita payload válido e rejeita email inválido, senha < 8, nome vazio, campos ausentes.
- `auth.controller.spec.ts`: `POST /auth/tokens` devolve `{ accessToken, tokenType, expiresIn }`.
- E2E (`test/auth.e2e-spec.ts`) complementa, não substitui, os unitários.

## Persistência do plano
Após aprovação, antes de codar: copiar este plano para `plans/api-auth.md` na raiz do repo (já existe `plans/login-layout.md`, seguir o mesmo formato) e commitá-lo só se o usuário pedir.

## Verificação
1. `pnpm api:lint`, `pnpm api:build`.
2. `pnpm api:test` (unit: hash nunca vaza, 409 duplicado, 401 credencial inválida) e `pnpm api:test:e2e` (cadastro → 201+Location; duplicado → 409; body inválido → 400; token → 201; `/users/me` com Bearer → 200 e sem token → 401).
3. `pnpm api:dev`, abrir `http://localhost:3000/docs` e conferir schemas de entrada/saída e botão Authorize; teste manual com curl do fluxo completo.
4. Commits em Conventional Commits (`feat(api): ...`) na branch atual só quando o usuário pedir.
