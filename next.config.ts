import type { NextConfig } from "next";

/**
 * Cache Components e Partial Prefetching vêm ligados por padrão no create-next-app 16.4
 * e são recursos novos. Ficam desligados por prudência até haver motivo para usar.
 * Teste de 19/10/2026 no runtime local do Workers: com eles ligados as páginas também
 * responderam, então não há bug conhecido. Só não foi validado em deploy real.
 */
const nextConfig: NextConfig = {
  // O `next dev` gera um AGENTS.md sozinho. As instruções para agentes do projeto serão nossas.
  agentRules: false,
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
