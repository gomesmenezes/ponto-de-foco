import { test } from "node:test";
import assert from "node:assert/strict";
import { buildApp } from "./app.js";

test("API inicial responde health e não expõe endpoints de registros", async () => {
  const app = buildApp();
  try {
    const response = await app.inject({ method: "GET", url: "/health" });
    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), {
      status: "ok",
      project: "ponto-de-foco",
      stage: "semana-1",
      database: "not-connected",
    });
    assert.equal(
      (await app.inject({ method: "POST", url: "/visits", payload: {} }))
        .statusCode,
      404,
    );
  } finally {
    await app.close();
  }
});
