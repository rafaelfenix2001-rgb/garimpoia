import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("GET /api/health", () => {
  it("responde ok e declara que não há dados de preço conectados", async () => {
    const res = GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("ok");
    expect(body.app).toBe("garimpo-ia");
    expect(body.dataMode).toBe("none");
    expect(Number.isNaN(Date.parse(body.time))).toBe(false);
  });
});
