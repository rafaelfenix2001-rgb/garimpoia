import type { Metadata } from "next";
import { pesquisaFeitaEm, sources, statusLabel, type SourceStatus } from "@/content/sources";

export const metadata: Metadata = {
  title: "Fontes de preço",
  description: "O que apurei sobre cada fonte de preços e programa de afiliados.",
};

const badge: Record<SourceStatus, string> = {
  candidata: "border-gold-fill bg-gold-fill/20 text-fg",
  "depende-de-aprovacao": "border-river text-river",
  bloqueada: "border-line text-muted",
  "nao-avaliada": "border-line text-muted",
  descartada: "border-line text-muted line-through",
};

export default function Fontes() {
  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <h1 className="font-display text-4xl font-bold tracking-tight">Fontes de preço</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Resultado da Etapa 0, pesquisado em {pesquisaFeitaEm}. Cada item diz o que foi lido
        e o que não foi testado. Nada aqui foi validado com conta real, porque ainda não
        existe nenhuma conta. Regras de loja mudam: confirme antes de depender delas.
      </p>

      <div className="mt-10 space-y-10">
        {sources.map((s) => (
          <article key={s.id} aria-labelledby={`fonte-${s.id}`} className="border-t border-line pt-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h2 id={`fonte-${s.id}`} className="font-display text-2xl font-bold">
                {s.nome}
              </h2>
              <span className={`rounded-full border px-3 py-0.5 text-sm ${badge[s.status]}`}>
                {statusLabel[s.status]}
              </span>
            </div>
            <p className="mt-1 text-sm text-muted">Serve para: {s.papel}</p>
            <p className="mt-3 max-w-2xl">{s.resumo}</p>

            {s.exigencias.length > 0 ? (
              <>
                <h3 className="mt-4 font-semibold">O que exige</h3>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-muted">
                  {s.exigencias.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </>
            ) : null}

            <h3 className="mt-4 font-semibold">Riscos e limites</h3>
            <ul className="mt-1 list-disc space-y-1 pl-5 text-muted">
              {s.riscos.map((x) => (
                <li key={x}>{x}</li>
              ))}
            </ul>

            <p className="mt-4 text-sm text-muted">
              <span className="font-semibold text-fg">O que foi verificado:</span> {s.verificado}
            </p>

            {s.referencias.length > 0 ? (
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                {s.referencias.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer">
                      {r.titulo}
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>
        ))}
      </div>
    </main>
  );
}
