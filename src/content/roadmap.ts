export type StepStatus = "concluida" | "pendente";

export interface RoadmapStep {
  id: number;
  titulo: string;
  entrega: string;
  status: StepStatus;
  /** Quando a etapa depende de algo externo à programação. */
  dependeDe?: string;
}

/** Fonte única do roadmap exibido na home. Atualize ao fechar cada etapa. */
export const roadmap: RoadmapStep[] = [
  {
    id: 0,
    titulo: "Fundamentos",
    entrega: "Fontes de preço e programas de afiliados avaliados; decisões registradas.",
    status: "concluida",
  },
  {
    id: 1,
    titulo: "Esqueleto do projeto",
    entrega: "App rodando localmente, runtime testado, CI e documentação.",
    status: "concluida",
  },
  {
    id: 2,
    titulo: "Contratos e banco de dados",
    entrega: "Modelo de ofertas, preços, cupons e alertas, com login e regras de acesso.",
    status: "pendente",
    dependeDe: "Conta no Supabase (gratuita)",
  },
  {
    id: 3,
    titulo: "Primeira fonte de preços reais",
    entrega:
      "Busca devolvendo ofertas reais de uma loja autorizada. Cada preço consultado já é guardado com data e hora, onde os termos da fonte permitirem.",
    status: "pendente",
    dependeDe: "Conta de afiliado aprovada e chave de API",
  },
  {
    id: 4,
    titulo: "Primeiro link de afiliado",
    entrega: "Clique em uma oferta real leva a um link rastreado da nossa conta.",
    status: "pendente",
    dependeDe: "Mesma aprovação da etapa 3",
  },
  {
    id: 5,
    titulo: "Busca e comparação na tela",
    entrega: "Primeiro fluxo comercial completo, ordenado por preço.",
    status: "pendente",
  },
  {
    id: 6,
    titulo: "Histórico de preços na tela",
    entrega: "Menor preço, média e mediana por produto, calculados sobre os preços já guardados.",
    status: "pendente",
  },
  {
    id: 7,
    titulo: "Segunda fonte e equivalência",
    entrega: "Comparação entre lojas diferentes para o mesmo produto.",
    status: "pendente",
  },
];
