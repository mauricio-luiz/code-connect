# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Layout

pnpm workspace (`apps/*`) with two independent apps and no shared packages:

- `apps/api` — NestJS 12 backend (ESM, Vitest, oxlint with type-aware rules). Currently the default scaffold (`AppModule`, `AppController`, `AppService`); listens on `PORT` or 3000.
- `apps/web` — React 19 + Vite 8 frontend (TypeScript, oxlint). Tailwind CSS 4, React Router; currently has the Login page (`/login`).

## Commands

Run from the repo root (they proxy to `pnpm --filter`):

- `pnpm dev` — run web and api dev servers in parallel
- `pnpm web:dev` / `pnpm api:dev` — run one app (api uses `nest start --watch`)
- `pnpm build` / `pnpm lint` — all apps (`pnpm web:build`, `api:build`, `web:lint`, `api:lint` for one)
- `pnpm api:test` — unit tests (`*.spec.ts`, colocated in `src/`)
- `pnpm api:test:e2e` — e2e tests (`*.e2e-spec.ts` in `test/`, separate `vitest.config.e2e.ts`)
- Single test: `pnpm --filter ./apps/api exec vitest run src/app.controller.spec.ts` (add `-t "name"` to filter by test name)

- `pnpm web:test` — web unit tests (Vitest + Testing Library, jsdom; `*.test.tsx` colocated with each component)

`web:build` runs `tsc -b` before `vite build`.

## Git

Both projects use [Conventional Commits](https://www.conventionalcommits.org/): `<type>(<optional scope>): <description>`, with types such as `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `build`, `ci`. Use `!` or a `BREAKING CHANGE:` footer for breaking changes. Use the app as scope when relevant (e.g. `feat(web): ...`, `fix(api): ...`).

## Web conventions

- **Atomic Design**: organize components under `src/components/` as `atoms/`, `molecules/`, `organisms/`, `templates/` and `pages/`. Lower levels never import from higher ones (atoms don't import molecules, etc.).
- **Styling**: Tailwind CSS utility classes. Avoid ad-hoc CSS files for component styles.
- **Tests**: every component must have a test covering its essential usage (renders, main props/variants, primary interaction). A component is not done without it. Vitest + Testing Library are configured in `apps/web` (`pnpm web:test`); put `Name.test.tsx` next to each component.

## API conventions (see `apps/api/AGENTS.md`)

- **REST**: the API must follow REST principles strictly:
  - Resource-oriented URLs: plural nouns, no verbs (`/posts/:id/comments`, not `/getComments`); nest only to express ownership.
  - Correct HTTP methods and semantics: `GET` safe and idempotent, `PUT` full replace (idempotent), `PATCH` partial update, `DELETE` idempotent, `POST` for creation.
  - Correct status codes: `201` + `Location` header on creation, `204` for empty responses, `400`/`422` for validation errors, `401`/`403`, `404`, `409` for conflicts; never `200` with an error body.
  - Stateless requests (no server-side session state), consistent JSON representations, and a uniform error format.
  - Collections support pagination, filtering and sorting via query parameters.
  - Use `Content-Type`/`Accept` correctly; version through the URL prefix or header consistently.

- The project is ESM: relative imports must end in `.js` (e.g. `./app.module.js`), `__dirname` doesn't exist (use `import.meta.dirname`), and mocks are `vi.fn()`, not `jest.fn()`.
- NestJS here is newer than typical training data. Docs index: https://docs.nestjs.com/llms.txt. Check first-party `@nestjs/*` packages before adding third-party libraries.
- Validation is intended to use Standard Schema libraries (Zod, etc.) via `StandardSchemaValidationPipe` with `@Body({ schema })`, rather than class-validator classes.
- Production telemetry (NestJS Observe) is not wired up until `ObserveModule` is registered in `src/app.module.ts`.
