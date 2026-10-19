# Arquitetura

Este documento descreve o desenho alvo. **Hoje existe só o esqueleto** (home, `/fontes`, `/api/health`). O resto entra por etapa, com aprovação.

## Visão geral

```text
Usuário ──► Next.js no Cloudflare Workers
              ├─ /api/search  (Etapa 3 em diante)
              │     cache curto → provedores de preço (em paralelo, com timeout)
              │     → normalização → provedor de link afiliado → resposta com "atualizado em"
              └─ páginas

Supabase (Postgres + Auth + RLS, Etapa 2 em diante)
   produtos, ofertas, preços observados, cupons, favoritos, alertas

Jobs agendados (depois da validação)
   atualização de itens monitorados e envio de alertas
```

Regras do briefing que se mantêm: a busca pública não passa por função do Supabase a cada requisição; segredos ficam só no servidor; preço e afiliado são camadas separadas (ADR 0004).

## Núcleo de dados (desenho, ainda sem tabelas)

- **Produto canônico**: o que o usuário quer comprar. Chave preferida: GTIN/EAN. Sem GTIN, modelo e variação. Na dúvida, não agrupa.
- **Oferta**: um produto numa loja, com ID externo estável, URL canônica e fonte.
- **Preço observado**: oferta, valor, frete (quando conhecido), condição, horário da coleta e fonte. Só inserção, nunca atualização.
- **Cupom**: loja, código, período, regra. Nunca aplicado sem origem declarada.
- **Alerta**: regra do usuário (produto e preço alvo) e fila de envio.

## Onde cada recurso futuro se encaixa

Ver ADR 0006. Em resumo: histórico e cupons são tabelas que leem o núcleo; a recomendação "vale a pena" é uma função pura sobre o histórico e responde "não sei" quando faltam dados; alertas usam login e uma fila.

## Fonte de dados por adaptador

Cada fonte implementa o mesmo contrato e declara a própria **política de armazenamento** (ADR 0005). Trocar ou desligar uma fonte não mexe no resto do app.

## Cache e limites no plano gratuito

- Workers Free: 100 mil requisições por dia e 10 ms de CPU por requisição (confirmado na documentação da Cloudflare).
- Cada requisição pode fazer até 50 subchamadas, e as operações da Cache API contam no mesmo limite. O desenho de busca em paralelo precisa respeitar isso.
- Cache da busca por 5 a 15 minutos, sempre respeitando o que a fonte permitir (a Amazon, por exemplo, recomenda 1 hora para preços).

## O que ainda não foi validado

- Deploy real na Cloudflare.
- Consumo real de CPU contra o limite de 10 ms.
- Qualquer integração com loja, rede de afiliados ou Supabase.
