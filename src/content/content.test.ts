import { describe, expect, it } from "vitest";
import { roadmap } from "./roadmap";
import { sources } from "./sources";

describe("roadmap", () => {
  it("tem ids sequenciais a partir de zero", () => {
    expect(roadmap.map((e) => e.id)).toEqual(roadmap.map((_, i) => i));
  });

  it("não marca etapa como concluída depois de uma pendente", () => {
    const primeiraPendente = roadmap.findIndex((e) => e.status === "pendente");
    if (primeiraPendente === -1) return;
    const concluidaDepois = roadmap.slice(primeiraPendente).some((e) => e.status === "concluida");
    expect(concluidaDepois).toBe(false);
  });
});

describe("fontes de preço", () => {
  it("tem ids únicos", () => {
    const ids = sources.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("só usa links https nas referências", () => {
    for (const s of sources) {
      for (const r of s.referencias) {
        expect(r.url.startsWith("https://")).toBe(true);
      }
    }
  });

  it("diz o que foi verificado em toda fonte", () => {
    for (const s of sources) {
      expect(s.verificado.trim().length).toBeGreaterThan(0);
    }
  });
});
