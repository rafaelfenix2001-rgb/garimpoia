import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Garimpo IA", template: "%s | Garimpo IA" },
  description:
    "Comparador brasileiro de preços com histórico, cupons e alertas. Em construção.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="flex min-h-full flex-col">
        <header className="border-b border-line">
          <nav
            aria-label="Principal"
            className="mx-auto flex max-w-4xl items-baseline justify-between gap-6 px-5 py-4"
          >
            <Link href="/" className="font-display text-xl font-bold text-fg no-underline">
              Garimpo IA
            </Link>
            <ul className="flex gap-5 text-sm">
              <li>
                <Link href="/">Andamento</Link>
              </li>
              <li>
                <Link href="/fontes">Fontes de preço</Link>
              </li>
            </ul>
          </nav>
        </header>
        <div className="flex-1">{children}</div>
        <footer className="border-t border-line">
          <p className="mx-auto max-w-4xl px-5 py-5 text-sm text-muted">
            Este site ainda não exibe preços: nenhuma fonte autorizada foi conectada.
            Quando exibir, todo valor virá de uma loja e trará o horário da consulta.
          </p>
        </footer>
      </body>
    </html>
  );
}
