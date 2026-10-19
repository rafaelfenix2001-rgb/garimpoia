# 0004. Preço e afiliado em camadas separadas

Status: aceita em 19/10/2026. Confirma o briefing (seções 2 e 3).

## Decisão

- `SearchDataProvider` entrega preço, URL, ID externo, título e variação.
- `AffiliateLinkProvider` entrega o link rastreável da nossa conta, ou `null`.
- Nunca usamos o link afiliado de um fornecedor de dados como se fosse nosso.

## Regra de exibição quando não há link próprio (`null`)

- A oferta continua aparecendo, com o link direto da loja e um aviso de que não há comissão.
- A ordem da lista é sempre por preço. Comissão nunca muda a posição de uma oferta.

## Por quê

O produto depende de confiança. Se a comissão decidisse a ordem, o comparador perderia o sentido. E mostrar a oferta sem comissão evita esconder o menor preço só porque ele não paga.

## Contratos

A forma exata de `NormalizedOffer` e dos dois provedores é definida na Etapa 2, com testes. Esta etapa só fixa a regra.
