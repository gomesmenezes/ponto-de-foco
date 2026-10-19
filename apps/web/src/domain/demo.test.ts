import { test } from "node:test";
import assert from "node:assert/strict";
import { demoReducer, initialState, resolveRoute } from "./demo.js";

test("acesso direto exige sessão; coleta exige seleção e preparação", () => {
  assert.equal(resolveRoute("/painel", initialState), "/acesso");
  const signed = demoReducer(initialState, { type: "LOGIN" });
  assert.equal(resolveRoute("/visita/nova", signed), "/preparacao");
  const selected = demoReducer(signed, {
    type: "SELECT_AREA",
    id: "catole-01",
  });
  assert.equal(resolveRoute("/visita/nova", selected), "/preparacao");
  const ready = demoReducer(selected, { type: "PREPARE" });
  assert.equal(resolveRoute("/visita/nova", ready), "/visita/nova");
});

test("trocar a microárea invalida a preparação anterior", () => {
  let s = demoReducer(initialState, { type: "LOGIN" });
  s = demoReducer(s, { type: "SELECT_AREA", id: "catole-01" });
  s = demoReducer(s, { type: "PREPARE" });
  s = demoReducer(s, { type: "SELECT_AREA", id: "centro-02" });
  assert.equal(s.prepared, false);
  assert.equal(resolveRoute("/visita/nova", s), "/preparacao");
});

test("variações de barra final e caixa não contornam a preparação exigida pelo roteador", () => {
  const signed = demoReducer(initialState, { type: "LOGIN" });
  for (const path of [
    "/visita/nova/",
    "/VISITA/NOVA",
    "/visitas///",
    "/VISITA/CONFIRMACAO/",
  ]) {
    assert.equal(resolveRoute(path, signed), "/preparacao");
  }
  assert.equal(resolveRoute("/PAINEL/", signed), "/painel");
});

test("cancelamento preserva registros e não cria visita parcial", () => {
  const s = demoReducer(initialState, { type: "CANCEL_VISIT" });
  assert.deepEqual(s.visits, initialState.visits);
  assert.equal(s.lastVisitId, null);
});

test("sem rede e rejeição preservam a fila; aceitação a conclui apenas na simulação", () => {
  const offline = demoReducer(initialState, {
    type: "NETWORK",
    network: "offline",
  });
  const waiting = demoReducer(offline, { type: "SYNC", accepted: true });
  assert.deepEqual(waiting.visits, offline.visits);
  assert.equal(waiting.syncState, "offline");
  const online = demoReducer(waiting, { type: "NETWORK", network: "online" });
  const rejected = demoReducer(online, { type: "SYNC", accepted: false });
  assert.deepEqual(rejected.visits, initialState.visits);
  assert.equal(rejected.syncState, "failure");
  const accepted = demoReducer(rejected, { type: "SYNC", accepted: true });
  assert.ok(accepted.visits.every((v) => v.status === "synced"));
  assert.equal(accepted.syncState, "success");
});

test("salvar exige área preparada e gera uma única pendência; sair limpa a sessão", () => {
  const visit = {
    id: "teste-01",
    areaId: "catole-01",
    block: "Q-08",
    address: "Imóvel fictício",
    result: "inspecionado" as const,
    foci: 1,
    container: "Pneu",
    notes: "",
    date: "2026-10-19",
    time: "10:00",
    status: "pending" as const,
  };
  assert.equal(
    demoReducer(initialState, { type: "SAVE_VISIT", visit }).visits.length,
    initialState.visits.length,
  );
  let s = demoReducer(initialState, { type: "LOGIN" });
  s = demoReducer(s, { type: "SELECT_AREA", id: visit.areaId });
  s = demoReducer(s, { type: "PREPARE" });
  s = demoReducer(s, { type: "SAVE_VISIT", visit });
  s = demoReducer(s, { type: "SAVE_VISIT", visit });
  assert.equal(s.visits.length, initialState.visits.length + 1);
  assert.equal(s.lastVisitId, visit.id);
  assert.equal(s.visits[0].status, "pending");
  assert.deepEqual(demoReducer(s, { type: "LOGOUT" }), initialState);
});
