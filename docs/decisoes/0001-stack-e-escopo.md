# 0001. Stack e escopo da Etapa 1

Status: aceita em 19/10/2026.

## Decisão

- Next.js 16 (App Router) com TypeScript e Tailwind CSS 4.
- npm como gerenciador, para ser simples no Windows. Node 22 (arquivo `.nvmrc`).
- Testes com Vitest, lint com ESLint, CI no GitHub Actions.
- Supabase (banco e login) só entra na Etapa 2. Nada de segredo ou conta externa nesta etapa.

## Por quê

O briefing já define Next.js, Supabase e Cloudflare Workers. A Etapa 1 só precisa provar que o app roda, compila para Workers e tem uma base de qualidade (lint, tipos, testes, build). Código de produto e banco ficam para as etapas seguintes.

## O que a Etapa 1 entrega

- Home com o andamento real do projeto e página `/fontes` com o que foi apurado.
- `GET /api/health`, que declara `dataMode: "none"`: o app não serve preço nenhum, nem simulado.
- Nenhum dado de preço, cupom ou histórico, real ou fictício.
