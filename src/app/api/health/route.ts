import { NextResponse } from "next/server";
import pkg from "../../../../package.json";

export const dynamic = "force-dynamic";

/**
 * Verificação de saúde do app. `dataMode: "none"` significa que nenhuma fonte de preços
 * reais está conectada: o app não serve preço algum, nem simulado.
 */
export function GET() {
  return NextResponse.json({
    status: "ok",
    app: pkg.name,
    version: pkg.version,
    dataMode: "none",
    time: new Date().toISOString(),
  });
}
