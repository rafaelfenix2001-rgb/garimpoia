# Fontes de preço e programas de afiliados

Pesquisa feita em 19/10/2026, lendo páginas oficiais sempre que o site permitiu. **Nada foi testado com conta real**, porque ainda não existe nenhuma. Onde só achei fonte de terceiros, está dito.

## Resumo

| Fonte | Preço | Cupom | Link afiliado | Situação |
| --- | --- | --- | --- | --- |
| Lomadee | sim (preço, preço de lista, EAN) | sim (código e período) | sim (link curto por loja) | **candidata a primeira fonte** |
| Awin | feeds por anunciante | via plataforma | sim | depende de aprovação por anunciante |
| Shopee Afiliados | sim | não verificado | sim | depende de aprovação; API por pedido |
| Amazon Creators API | sim | não | sim | bloqueada: 10 vendas em 30 dias |
| Mercado Livre | busca com relatos de 403 | não | painel manual, sem API oficial que eu tenha achado | bloqueada por ora |

## Lomadee

O que a documentação oficial (docs.lomadee.com.br) diz:

- Chave de API no cabeçalho `x-api-key`, com escopos. Falta de escopo dá 403.
- Limite global de 60 requisições por 60 segundos, por chave e IP. Respostas trazem `X-RateLimit-*` e, no excesso, `Retry-After`.
- Produtos: busca por texto (`search`), faixa de preço (`price`, em centavos), loja (`organizationIds`) e disponibilidade. Até 100 por página. Cada produto traz `options[].pricing[]` com `price` e `listPrice`, `options[].ean` e `url`.
- Campanhas: tipos `PersonalCoupon`, `GenericCoupon` e `Offer`, com `code`, `period` (início e fim, ou nulo se permanente) e filtros por loja e categoria. Não há campo de valor de desconto.
- Links curtos: `POST` com `organizationId` e `type` (`Coupon`, `Offer`, `BrandPage`, `Custom` ou `Home`). A resposta pode trazer a mensagem "Organization approval is required to generate links", ou seja, **cada loja precisa aprovar a conta**.
- Cadastro de afiliado: a página institucional diz que é gratuito, sem exigir comprovação de audiência para começar. O campo sobre CNPJ ficou em branco na FAQ.

O que **não** está na documentação e precisa de resposta por escrito do suporte:

1. Podemos guardar os preços consultados para montar histórico?
2. Quais lojas aparecem na busca de produtos para a nossa conta?
3. A busca de produtos exige aprovação da loja, ou só a criação de link?
4. Pode usar a API em um site público de comparação? Há exigência de CNPJ?
5. O valor do desconto dos cupons vem por algum campo?

Para pedir a chave, um guia de terceiros descreve: criar a conta, abrir "Credenciais de API" no painel e gerar o token (liberação em até 3 dias). Confirme na tela, porque não é documentação oficial.

## Awin

- Cadastro aceito a critério da Awin. Pode haver um "Sign Up Deposit" reembolsável, com valor indicado no formulário e devolvido no primeiro pagamento (termos de publisher do Brasil, agosto de 2025).
- Cada anunciante aprova ou recusa o publisher separadamente.
- A API de publisher usa OAuth2. Os feeds funcionam por anunciante, e a Awin descreve que anunciantes com aprovação automática e feed válido permitem baixar o feed mesmo antes da aprovação formal ("soft membership"), com crédito de venda.
- A KaBuM! informa que o programa dela roda na Awin.
- Os termos do Brasil não tratam de comparadores nem de guardar dados de feed.

## Shopee Afiliados

- Os termos oficiais proíbem extração automatizada de dados da Shopee (4.3, d) e anúncios pagos em Google e Bing para divulgar links (4.3, i). Não falam de API nem de armazenamento de preço.
- Aprovação a critério da Shopee. Pessoa física recebe pela conta Maree. Pessoa jurídica precisa de conta corrente no CNPJ e nota fiscal de serviços.
- A API (GraphQL, assinada com AppId e Secret) tem busca de ofertas e geração de links. A única descrição que li é de um guia **não oficial**, que diz que a ativação é pedida por formulário depois de virar afiliado, em até 2 semanas.

## Amazon (Creators API)

- A PA-API 5 foi substituída pela Creators API; chamadas à PA-API respondem 403.
- O Brasil aparece na lista de países da documentação.
- Exige conta de Associados e "pelo menos 10 vendas qualificadas nos últimos 30 dias". Sem vendas por 30 dias, o acesso termina.
- Limite inicial de 1 requisição por segundo e 8.640 por dia, que só cresce com receita.
- Contrato brasileiro (14/04/2026): cache de conteúdo da API por até 24 horas, carimbo de data e hora junto do preço, aviso de que o preço pode mudar, e o site precisa ter como finalidade principal levar vendas à Amazon. O conteúdo não pode treinar modelos de IA. A documentação da API recomenda 1 hora para ofertas.
- Não confirmei as regras de aprovação do programa em si.

## Mercado Livre

- A documentação oficial descreve `/sites/{site}/search?q=...` com token. Relatos públicos de desenvolvedores (a partir de março de 2026) dizem que o endpoint responde 403 mesmo com token válido. Não achei comunicado oficial, e não consegui reproduzir.
- Os termos de desenvolvedores que li (versão do site argentino) pedem atualizar o conteúdo a cada 24 horas (6 horas para listas), vedam misturar o conteúdo com o de terceiros e serviços que concorram com o Mercado Livre, e exigem autorização por escrito para certas médias de preço. Um comparador entre lojas cai em zona cinzenta.
- Afiliados: formulário em mercadolivre.com.br/l/afiliados-home. Pelo que li (reportagem de 2023, pode estar desatualizada), exige conta ativa, não ser vendedor, e a seleção depende de vagas. Não achei API oficial para gerar links; ferramentas de terceiros que automatizam o painel podem suspender a conta.

## O que eu preciso de você (nada disso foi feito)

Nenhuma conta foi criada e nenhuma credencial passou por mim.

1. **Lomadee** (principal): criar conta de afiliado gratuita, pedir aprovação nas lojas que interessam, gerar a chave de API e enviar as perguntas acima ao suporte.
2. **Mercado Livre Afiliados** (em paralelo, custo zero): preencher o formulário. Serve para link monetizado manual enquanto a busca estiver bloqueada.
3. **Shopee Afiliados** (em paralelo, custo zero): pedir entrada no programa.
4. **Amazon e Awin**: deixar para depois. A Amazon pede vendas antes de liberar a API, e a Awin pode ter depósito.

Quando a conta da Lomadee existir, me avise antes de eu usar qualquer chave: a chave vai no `.env.local`, que nunca vai para o Git.
