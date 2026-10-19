# Garimpo IA

Comparador brasileiro de preços com histórico, cupons e alertas. **Em construção.**

Hoje o projeto é só a fundação (Etapas 0 e 1). O site **não mostra preços**: nenhuma loja autorizada foi conectada, e nada é simulado. Veja o andamento na home e as fontes avaliadas em `/fontes`.

## Rodar no Windows

Você só precisa fazer isso uma vez:

1. Instale o **Node.js 22 LTS** (nodejs.org) e o **Git for Windows** (git-scm.com).
2. Descompacte o projeto, abra o **PowerShell** dentro da pasta `garimpo-ia`.
3. Confira as versões: `node -v` deve mostrar 22 ou mais; `git -v` deve responder.
4. Instale as dependências: `npm install` (leva alguns minutos).
5. Suba o site: `npm run dev`
6. Abra no navegador:
   - http://localhost:3000 (andamento do projeto)
   - http://localhost:3000/fontes (fontes de preço avaliadas)
   - http://localhost:3000/api/health (verificação de saúde, em JSON)

Para parar, `Ctrl + C` no PowerShell.

Se o PowerShell reclamar de política de execução, use o **Prompt de Comando (cmd)** no lugar.

## Comandos

| Comando | O que faz |
| --- | --- |
| `npm run dev` | site local com recarga automática |
| `npm run check` | lint, tipos, testes e build, tudo de uma vez |
| `npm run lint` / `typecheck` / `test` | cada verificação separada |
| `npm run cf:build` | gera o pacote para Cloudflare Workers |
| `npm run cf:preview` | roda esse pacote localmente |

`cf:build` e `cf:preview` usam o OpenNext, que **não tem suporte garantido no Windows** (a documentação recomenda WSL). Para o dia a dia use `npm run dev`; o build do Worker roda no GitHub Actions, em Linux.

## Estrutura

```text
src/app/            páginas e rotas (home, /fontes, /api/health)
src/content/        roadmap e fontes exibidos no site
docs/decisoes/      decisões técnicas (ADRs)
docs/               fontes e afiliados, arquitetura, guia do GitHub
.github/workflows/  CI (lint, tipos, testes, build, build do Worker)
```

## Segredos

Nada de chave ou senha no código. Quando houver, vai no `.env.local` (ignorado pelo Git). O modelo está em `.env.example`.

## Próximos passos

Veja `docs/fontes-e-afiliados.md` (o que preciso que você faça nas contas) e `docs/guia-github.md` (criar o repositório e conectar).
