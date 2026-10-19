export type SourceStatus =
  | "candidata"
  | "depende-de-aprovacao"
  | "bloqueada"
  | "nao-avaliada"
  | "descartada";

export interface SourceInfo {
  id: string;
  nome: string;
  papel: string;
  status: SourceStatus;
  resumo: string;
  exigencias: string[];
  riscos: string[];
  /** O que foi realmente verificado, e como. */
  verificado: string;
  referencias: { titulo: string; url: string }[];
}

export const statusLabel: Record<SourceStatus, string> = {
  candidata: "Candidata a primeira fonte",
  "depende-de-aprovacao": "Depende de aprovação",
  bloqueada: "Bloqueada por ora",
  "nao-avaliada": "Ainda não avaliada",
  descartada: "Descartada",
};

/** Data da pesquisa que sustenta as conclusões abaixo. */
export const pesquisaFeitaEm = "19/10/2026";

/** Resumo das conclusões da Etapa 0. Detalhes em docs/fontes-e-afiliados.md. */
export const sources: SourceInfo[] = [
  {
    id: "lomadee",
    nome: "Lomadee",
    papel: "Preços, cupons e links",
    status: "candidata",
    resumo:
      "API de afiliados com busca de produtos (preço atual, preço de lista e EAN), campanhas de cupom e oferta com código e validade, e criação de links curtos. Preço, cupom e link saem da mesma conta nossa.",
    exigencias: [
      "Conta de afiliado e chave de API com os escopos necessários (por exemplo, o de criar links)",
      "Aprovação por loja: a documentação mostra a mensagem \"Organization approval is required to generate links\" quando a loja ainda não aprovou a conta",
    ],
    riscos: [
      "A documentação não diz nada sobre guardar preços para montar histórico: precisa de resposta por escrito do suporte",
      "Limite de 60 requisições por minuto por chave e IP",
      "Não sei quais lojas aparecem na busca de produtos, nem se ela exige aprovação da loja",
      "O cupom traz código e período, mas a documentação não lista o valor do desconto",
    ],
    verificado:
      "Documentação oficial (introdução, produtos, campanhas e links curtos) lida em 19/10/2026. Nada testado com conta real.",
    referencias: [
      { titulo: "API de afiliados: introdução", url: "https://docs.lomadee.com.br/api-reference/introduction" },
      { titulo: "Listar produtos", url: "https://docs.lomadee.com.br/api-reference/affiliate/products/all.md" },
      { titulo: "Listar campanhas e cupons", url: "https://docs.lomadee.com.br/api-reference/affiliate/campaigns/all.md" },
      { titulo: "Gerar link curto", url: "https://docs.lomadee.com.br/api-reference/affiliate/shorten/create.md" },
    ],
  },
  {
    id: "awin",
    nome: "Awin",
    papel: "Preços (feeds) e links",
    status: "depende-de-aprovacao",
    resumo:
      "Rede com API de publisher e feeds de produtos por anunciante. A KaBuM! usa a Awin para o programa de afiliados dela. A Awin cita os feeds como base para tabelas de comparação.",
    exigencias: [
      "Cadastro como publisher, aceito a critério da Awin; pode haver depósito reembolsável, com valor indicado no formulário",
      "Cada anunciante aprova ou recusa o publisher por conta própria",
    ],
    riscos: [
      "Regras e comissões mudam de anunciante para anunciante",
      "Os termos de publisher do Brasil não tratam de comparadores nem de guardar dados de feed, então o limite real vem de cada anunciante",
      "Há depósito no cadastro, o que pesa para quem quer começar sem gastar",
    ],
    verificado:
      "Termos de publisher do Brasil (agosto de 2025), FAQ de publishers e página institucional lidos. A página de comparação não menciona o valor do depósito. Nada testado com conta real.",
    referencias: [
      { titulo: "Compra por comparação (Awin)", url: "https://www.awin.com/br/marketing-de-afiliacao/o-que-e-compra-por-comparacao" },
      { titulo: "Termos de publisher do Brasil", url: "https://www.awin.com/docs.awin.com/Legal/Publisher+Terms/2025/BR_EN-(US)-Awin-Brazil-Publisher-terms-August-2025.pdf" },
      { titulo: "FAQ para publishers", url: "https://help.awin.com/developers/docs/faqs-for-publishers" },
    ],
  },
  {
    id: "shopee",
    nome: "Shopee Afiliados",
    papel: "Preços e links",
    status: "depende-de-aprovacao",
    resumo:
      "API em GraphQL com busca de ofertas e geração de links curtos, acessada com AppId e Secret. A documentação que li é de terceiros; a página oficial só abre com JavaScript.",
    exigencias: [
      "Aprovação no programa de afiliados, a critério da Shopee",
      "Depois de afiliado, pedir a ativação da API por formulário; um guia não oficial cita até 2 semanas",
      "Pessoa física recebe pela conta Maree. Pessoa jurídica precisa de conta corrente no CNPJ e nota fiscal de serviços",
    ],
    riscos: [
      "Os termos proíbem extração automatizada de dados da Shopee e anúncios pagos em Google e Bing para divulgar links",
      "Os termos não falam de API nem de guardar preços",
      "Não consegui ler a documentação oficial da API",
    ],
    verificado:
      "Termos oficiais do programa lidos. Documentação da API só por guia não oficial. Nada testado com conta real.",
    referencias: [
      { titulo: "Termos do programa de afiliados", url: "https://help.shopee.com.br/portal/10/article/124094-Programa-de-Afiliados-da-Shopee-Termos-e-Condi%C3%A7%C3%B5es" },
      { titulo: "Explorador da API", url: "https://open-api.affiliate.shopee.com.br/explorer/v2" },
    ],
  },
  {
    id: "amazon",
    nome: "Amazon (Creators API)",
    papel: "Preços e links",
    status: "bloqueada",
    resumo:
      "A Creators API substituiu a PA-API 5 (que já responde 403). O Brasil consta na lista de países. A API exige conta de Associados e pelo menos 10 vendas qualificadas nos últimos 30 dias.",
    exigencias: [
      "Conta de Associados da Amazon Brasil aprovada",
      "10 vendas qualificadas em 30 dias para acessar a API; sem vendas por 30 dias, o acesso termina",
    ],
    riscos: [
      "Preços da Amazon não podem alimentar nosso histórico: o contrato brasileiro limita o cache a 24 horas, e a documentação da API recomenda 1 hora para ofertas",
      "O contrato exige exibir carimbo de data e hora junto do preço e levar a venda para a Amazon",
      "O conteúdo da API não pode treinar modelos de IA",
      "Limite inicial de 1 requisição por segundo e 8.640 por dia, que só cresce com vendas",
      "Quem ainda não vende não passa da primeira exigência: fica para depois",
    ],
    verificado:
      "Contrato brasileiro dos Associados (14/04/2026), documentação da Creators API e páginas de limites e boas práticas lidos. As regras de aprovação do programa não foram confirmadas.",
    referencias: [
      { titulo: "Políticas e contrato dos Associados (BR)", url: "https://associados.amazon.com.br/help/operating/policies" },
      { titulo: "Creators API: introdução", url: "https://affiliate-program.amazon.com/creatorsapi/docs/en-us/introduction" },
      { titulo: "Creators API: limites", url: "https://affiliate-program.amazon.com/creatorsapi/docs/en-us/concepts/api-rates" },
    ],
  },
  {
    id: "mercado-livre",
    nome: "Mercado Livre",
    papel: "Preços e links",
    status: "bloqueada",
    resumo:
      "A documentação ainda descreve a busca por palavra-chave, mas desenvolvedores relatam erro 403 nela desde o início de 2026, mesmo com token válido. O programa de afiliados é por formulário e não achei API oficial para gerar links.",
    exigencias: [
      "Aplicativo cadastrado no DevCenter",
      "Confirmação por escrito de que a busca está liberada para o nosso uso",
      "Para afiliado: ter conta no Mercado Livre, não ser vendedor e ser selecionado conforme vagas",
    ],
    riscos: [
      "Os termos para desenvolvedores que li exigem atualizar o conteúdo a cada 24 horas (6 horas para listas de anúncios)",
      "Os mesmos termos vedam misturar o conteúdo com o de terceiros e proíbem serviços que concorram com o Mercado Livre: um comparador entre lojas cai nessa zona cinzenta",
      "Médias de preço por categoria exigem autorização prévia por escrito",
      "Ferramentas de terceiros que geram link de afiliado usam o painel de forma não oficial, o que pode suspender a conta",
    ],
    verificado:
      "Documentação oficial, termos de desenvolvedores (versão do site argentino; não achei a brasileira) e relatos públicos lidos. O 403 não foi reproduzido, pois não há conta.",
    referencias: [
      { titulo: "Itens e buscas (documentação oficial)", url: "https://developers.mercadolivre.com.br/en_us/items-and-searches" },
      { titulo: "Termos para desenvolvedores", url: "https://developers.mercadolibre.com.ar/en_us/mercado-libre-developer-terms-and-conditions" },
    ],
  },
  {
    id: "outras-lojas",
    nome: "KaBuM!, Magalu, AliExpress e outras",
    papel: "A definir",
    status: "nao-avaliada",
    resumo:
      "A KaBuM! informa que o programa dela roda na Awin. Magalu e AliExpress não foram verificados. Várias lojas podem chegar por Lomadee ou Awin, o que só se confirma com as contas criadas.",
    exigencias: ["Depende das redes acima"],
    riscos: ["Sem informação confirmada além da KaBuM! na Awin"],
    verificado: "Página oficial de afiliados da KaBuM! lida. O resto: nada.",
    referencias: [
      { titulo: "Programa de afiliados da KaBuM!", url: "https://www.kabum.com.br/hotsite/afiliados/" },
    ],
  },
  {
    id: "raspagem",
    nome: "Raspagem e APIs de terceiros",
    papel: "Preços",
    status: "descartada",
    resumo:
      "Serviços que raspam lojas ou revendem dados com link de afiliado próprio. Quebram a regra de que todo link monetizado vem da nossa conta e dependem de autorização contratual.",
    exigencias: [],
    riscos: [
      "Termos da Shopee, Amazon e Mercado Livre que li proíbem coleta automatizada fora dos canais oficiais",
    ],
    verificado: "Termos das três lojas lidos; o briefing do projeto já veda esse caminho.",
    referencias: [],
  },
];
