# 0006. Arquitetura preparada para cupons, histórico, recomendações e alertas

Status: aceita em 19/10/2026. Ainda é desenho: o schema e os contratos são da Etapa 2.

## Ideia central

Cada recurso futuro entra como um módulo que lê o mesmo núcleo (produtos, ofertas, preços observados), sem exigir mudar a busca. Detalhes em `docs/arquitetura.md`.

## Como cada recurso se encaixa

| Recurso | Onde entra | O que já precisa existir no núcleo |
| --- | --- | --- |
| Histórico de preços | tabela de preços observados, só com inserção | oferta com ID estável por fonte e horário da coleta |
| Cupons | tabela própria, ligada à loja e, quando houver, ao produto | loja identificada; campo de frete e de preço final separados |
| Recomendação "comprar agora ou esperar" | função pura sobre o histórico | histórico real; sem histórico suficiente, o app diz que não sabe |
| Alertas | regra do usuário sobre um produto + fila de envio | produto canônico e login (Supabase Auth com RLS) |

## Regras que valem para todos

- Nenhum número sem origem. Preço, cupom e histórico trazem fonte e horário.
- Dado de demonstração fica marcado como demonstração e nunca vai ao mesmo lugar dos dados reais.
- A recomendação nunca é calculada com histórico curto demais: o mínimo de pontos será definido na Etapa 6 e mostrado ao usuário.

## O que fica de fora por enquanto

Nenhuma tabela, rota ou botão desses recursos existe hoje. A home diz isso.
