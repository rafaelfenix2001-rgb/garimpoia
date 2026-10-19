# 0002. Fontes de preço e programas de afiliados

Status: aceita em 19/10/2026. Detalhes e evidências em `docs/fontes-e-afiliados.md`.

## Contexto

O produto precisa de duas coisas independentes: preço de uma fonte e link monetizado da nossa conta de afiliado. Nenhuma conta existe ainda, então nada foi testado de verdade.

## Decisão

1. **Lomadee é a candidata a primeira fonte.** Pela documentação oficial, uma única conta entrega busca de produtos com preço e EAN, campanhas de cupom e criação de links. Falta confirmar na conta real: quais lojas aparecem, se há aprovação por loja para listar produtos, e se os termos deixam guardar preços.
2. **Mercado Livre e Amazon não são a primeira fonte.** Mercado Livre tem relatos públicos de erro 403 na busca e termos que dificultam um comparador. A Amazon exige 10 vendas qualificadas em 30 dias para liberar a API, e o contrato limita o cache de preço a 24 horas.
3. **Shopee e Awin ficam como segunda onda.** Dependem de aprovação; a Awin pode ter depósito no cadastro.
4. **Raspagem e APIs de terceiros que revendem dados estão descartadas.**
5. **A arquitetura não depende de nenhuma loja.** Cada fonte entra por um adaptador, atrás de uma chave liga/desliga.

## O que precisa acontecer antes de ativar uma fonte

- Conta aprovada e chave de API criada por Rafael (nenhuma credencial passa por mim).
- Leitura dos termos da fonte sobre cache e armazenamento de preço, com resposta por escrito do suporte quando a documentação for omissa.
- Um teste com a conta real registrado em `docs/`.

## Riscos conhecidos

- Regras de lojas mudam. A página `/fontes` mostra a data da pesquisa.
- Se nenhuma rede liberar o armazenamento de preços, o histórico só poderá usar fontes que permitam.
