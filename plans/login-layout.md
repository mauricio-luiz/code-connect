# Plano: tela de Login (Code Connect) com Atomic Design

## Contexto
`apps/web` ainda é o template do Vite. Vamos implementar o layout de [design/Login.png](design/Login.png) seguindo as convenções do CLAUDE.md (Atomic Design, Tailwind, todo componente com teste). A página de Cadastro virá depois com o **mesmo layout base** (fundo com símbolos + card + banner à esquerda + formulário à direita), mudando só o banner e os campos — então o layout fica em um template parametrizável.

Decisões já tomadas: React Router agora (rotas `/` → redirect `/login`, `/login`; `/cadastro` entra depois); formulário só com layout + `onSubmit` (campos controlados, `required` nativo, sem API).

## 1. Infra (apps/web)
- Instalar: `tailwindcss @tailwindcss/vite react-router`; dev: `vitest jsdom @testing-library/react @testing-library/user-event @testing-library/jest-dom`.
- `vite.config.ts`: plugin `tailwindcss()` + bloco `test` (environment `jsdom`, `setupFiles: ./src/test/setup.ts`, `globals: false`). Usar `/// <reference types="vitest/config" />`.
- `src/test/setup.ts`: importa `@testing-library/jest-dom/vitest` e `cleanup` em `afterEach`.
- `package.json`: scripts `test` (`vitest run`) e `test:watch`; root `package.json`: `web:test`. Atualizar CLAUDE.md (web agora tem test runner).
- `src/index.css` substituído por: `@import "tailwindcss";` + `@theme` com tokens do design:
  - `--color-bg: #01080E`, `--color-surface: #171D1F`, `--color-primary: #81FE88`, `--color-symbol: #132E35`, `--color-input: #888888`, `--color-text: #E1E1E1`, `--color-muted: #BCBCBC`
  - `--font-sans: "Prompt", sans-serif` (Google Fonts no `index.html`, pesos 400/500/600). `<html lang="pt-BR">`, título "Code Connect".
- Remover `App.css`, `src/assets/*` do template.

## 2. Componentes (`src/components/`)
Cada componente em sua pasta: `Nome/Nome.tsx`, `Nome/Nome.test.tsx`, `Nome/index.ts`.

**atoms/**
- `Heading` — `h1` "Login" (text-3xl, semibold).
- `Text` — parágrafo com variantes (`lead` para "Boas-vindas!...", `body`, `small`).
- `Label` — `<label htmlFor>`.
- `Input` — estende `InputHTMLAttributes`, `forwardRef`-less (React 19 `ref` como prop); fundo `bg-input`, texto escuro, rounded.
- `Checkbox` — input checkbox estilizado (borda primary, check verde) + label.
- `Button` — variante `primary` (bg-primary, texto bg), aceita `icon` à direita; `type` default `button`.
- `TextLink` — wrapper de `Link` do react-router com variantes `underline` ("Esqueci a senha") e `primary` ("Crie seu cadastro!").
- `Icon` — SVGs inline: `arrow-right`, `clipboard` (prop `name`, `aria-hidden`).
- `Divider` — linha horizontal com texto central opcional ("ou entre com outras contas").

**molecules/**
- `FormField` — `Label` + `Input`, gera `id` com `useId`. Reutilizável no cadastro (nome, email, senha).
- `SocialLoginButton` — botão com imagem (`/github.png`, `/google.png`) + legenda; prop `onClick`.

**organisms/**
- `SocialLogin` — `Divider` + lista de `SocialLoginButton` (Github, Gmail); prop `onSelect(provider)`. Reutilizável no cadastro.
- `LoginForm` — campos "Email ou usuário" e "Senha", linha Lembrar-me/Esqueci a senha, botão "Login →"; `onSubmit({ usuario, senha, lembrar })`.
- `AuthFooterLink` — "Ainda não tem conta?" + link com ícone; props `question`, `linkText`, `to` (no cadastro vira "Já tem conta? Faça login").

**templates/**
- `AuthTemplate` — props: `banner: { src, alt }`, `title`, `subtitle`, `children` (formulário), `footer`.
  - Fundo `bg-bg` full-screen com dois `<img src="/simbolo-login.svg">` decorativos (`aria-hidden`, absolutos: topo-esquerda e base-direita, `pointer-events-none`).
  - Card `bg-surface rounded-4xl`, grid 2 colunas no `md+` (banner 407×636 com `object-cover`), banner oculto em mobile, formulário centralizado em uma coluna.
  - Coluna direita: `Heading`, `Text lead`, `children`, `SocialLogin`, `footer`.

**pages/**
- `LoginPage` — compõe `AuthTemplate` com `banner-login.png`, `LoginForm` (onSubmit faz `console.info` por enquanto / TODO API) e `AuthFooterLink` para `/cadastro`.

## 3. Rotas
- `src/App.tsx`: `createBrowserRouter` com `/` → `<Navigate to="/login" />`, `/login` → `LoginPage`. `main.tsx` mantém `StrictMode`.

## 4. Testes (essenciais por componente)
- Atoms: renderiza conteúdo/variantes; `Button` dispara `onClick`; `Checkbox` alterna; `Input` repassa props.
- `FormField`: label associado ao input (`getByLabelText`).
- `SocialLogin`: clicar em Github chama `onSelect('github')`.
- `LoginForm`: preencher campos + marcar lembrar + submit → `onSubmit` com valores.
- `AuthTemplate`: renderiza título, subtítulo, banner (alt), children e footer.
- `LoginPage`: render dentro de `MemoryRouter`, link "Crie seu cadastro!" aponta para `/cadastro`.
- Componentes com `Link` testados com `MemoryRouter`.

## Verificação
- `pnpm web:test` — todos os testes passam.
- `pnpm web:lint` e `pnpm web:build` (inclui `tsc -b`) sem erros.
- `pnpm web:dev` e abrir `/login`, comparar visualmente com `design/Login.png` (desktop 1920 e mobile ~375px).
