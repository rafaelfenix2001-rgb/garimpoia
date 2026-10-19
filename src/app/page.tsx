import Link from "next/link";
import { roadmap } from "@/content/roadmap";

export default function Home() {
  const concluidas = roadmap.filter((e) => e.status === "concluida").length;
  const proxima = roadmap.find((e) => e.status === "pendente");

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <section aria-labelledby="titulo" className="max-w-2xl">
        <h1
          id="titulo"
          className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
        >
          Descobrir onde o produto está mais barato e se vale comprar agora.
        </h1>
        <p className="mt-5 text-lg text-muted">
          O Garimpo IA vai comparar lojas brasileiras, mostrar o histórico de preço,
          achar cupons e avisar quando o valor cair. Hoje existe só a fundação do projeto.
        </p>
        <p className="mt-5 rounded-md border border-line bg-panel px-4 py-3 text-base">
          Ainda não há busca nem preços aqui. Nenhuma loja autorizada foi conectada e
          o site não mostra nenhum valor simulado.
        </p>
      </section>

      <section aria-labelledby="andamento" className="mt-14">
        <h2 id="andamento" className="font-display text-2xl font-bold">
          Andamento: {concluidas} de {roadmap.length} etapas concluídas
        </h2>
        {proxima ? (
          <p className="mt-2 text-muted">
            Próxima etapa: {proxima.titulo}.
            {proxima.dependeDe ? ` Depende de: ${proxima.dependeDe}.` : ""}
          </p>
        ) : null}

        <ol className="mt-6 divide-y divide-line border-y border-line">
          {roadmap.map((etapa) => {
            const feita = etapa.status === "concluida";
            return (
              <li key={etapa.id} className="flex gap-4 py-4">
                <span
                  aria-hidden="true"
                  className={
                    "mt-1.5 inline-block size-3 shrink-0 rounded-full border-2 " +
                    (feita ? "border-gold-fill bg-gold-fill" : "border-line bg-transparent")
                  }
                />
                <div>
                  <p className="font-semibold">
                    Etapa {etapa.id}: {etapa.titulo}
                    <span className="sr-only">{feita ? " (concluída)" : " (pendente)"}</span>
                  </p>
                  <p className="text-muted">{etapa.entrega}</p>
                  {!feita && etapa.dependeDe ? (
                    <p className="mt-1 text-sm text-gold">Depende de: {etapa.dependeDe}</p>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section aria-labelledby="proximo-passo" className="mt-14 max-w-2xl">
        <h2 id="proximo-passo" className="font-display text-2xl font-bold">
          O que decide o ritmo daqui para frente
        </h2>
        <p className="mt-3 text-muted">
          Sem uma loja autorizada e um link de afiliado da nossa conta, não existe fluxo
          comercial real. Veja o que apurei sobre cada fonte e o que ainda falta.
        </p>
        <p className="mt-4">
          <Link href="/fontes" className="font-semibold">
            Ver as fontes de preço avaliadas
          </Link>
        </p>
      </section>
    </main>
  );
}
