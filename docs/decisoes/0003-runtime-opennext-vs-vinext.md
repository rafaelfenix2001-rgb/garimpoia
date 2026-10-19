# 0003. Runtime: OpenNext ou vinext

Status: aceita em 19/10/2026. Escolha: **`@opennextjs/cloudflare` (OpenNext)**.

## Como testei

Montei o mesmo app mínimo nas duas opções: uma página dinâmica, uma rota `/api/search` com Cache API (MISS e depois HIT) e `@supabase/supabase-js`. Numa segunda rodada, adicionei `proxy.ts`, `cookies()`, `headers()` e `@supabase/ssr`. Rodei no runtime local do Workers (workerd), em Linux.

## Resultado

| Item | OpenNext 1.20.12 + Next 16.4.2 | vinext 1.2.1 + Vite 8 |
| --- | --- | --- |
| Build | passou (cerca de 20 s) | passou (cerca de 10 s) |
| Página, rota e Cache API | funcionou, MISS e HIT | funcionou, MISS e HIT |
| `proxy.ts`, cookies e Supabase SSR | funcionou, com aviso de suporte experimental para middleware em Node | funcionou |
| Tamanho do Worker | 1010 KiB comprimido (1756 KiB com o `proxy.ts` e `@supabase/ssr`) | não comparável: medi só o `index.js` (94 KiB comprimido) |
| Dependências | Next oficial, adaptador estável | exige `@cloudflare/vite-plugin` e `cf` em versão beta |
| Configuração | `wrangler.jsonc` e `open-next.config.ts` | o `init` pede escolhas de cache e imagem |

## Por quê OpenNext

Os dois funcionaram nos testes. OpenNext roda o Next real e tem adaptador estável. O vinext reimplementa a API do Next sobre o Vite e, no `init`, instalou pacotes em beta da Cloudflare. A prioridade definida foi estabilidade, não novidade.

## Limites que continuam em aberto

- Não fiz deploy real na Cloudflare. Tudo foi testado localmente.
- O limite de 10 ms de CPU por requisição do plano Free não dá para medir localmente. Precisa de medição em um Worker de teste.
- Middleware em Node (`proxy.ts` do Next 16) é marcado como experimental pelo OpenNext. Se o login do Supabase exigir isso, o aviso volta a ser relevante na Etapa 2.
- No Windows, a própria documentação do OpenNext diz que o suporte não é garantido e recomenda WSL. Por isso `npm run dev` (Next puro) é o caminho local, e o build para Workers roda no CI em Linux.

## Revisão

Reavaliar o vinext quando sair da fase beta e tiver motivo concreto (tempo de build, tamanho).
