export type AreaId = "catole-01" | "centro-02" | "malvinas-03";
export type Visit = {
  id: string;
  areaId: string;
  block: string;
  address: string;
  result: "inspecionado" | "fechado" | "recusado";
  foci: number;
  container: string;
  notes: string;
  date: string;
  time: string;
  status: "pending" | "synced";
};
export const areas = [
  {
    id: "catole-01",
    name: "Catolé",
    code: "MA 01",
    blocks: 6,
    planned: 36,
    position: [-7.241, -35.875] as [number, number],
    priority: "Alta",
    rank: 1,
  },
  {
    id: "centro-02",
    name: "Centro",
    code: "MA 02",
    blocks: 4,
    planned: 28,
    position: [-7.218, -35.883] as [number, number],
    priority: "Média",
    rank: 2,
  },
  {
    id: "malvinas-03",
    name: "Malvinas",
    code: "MA 03",
    blocks: 5,
    planned: 32,
    position: [-7.245, -35.923] as [number, number],
    priority: "Baixa",
    rank: 3,
  },
] as const;
const row = (
  id: string,
  areaId: AreaId,
  block: string,
  foci: number,
  status: Visit["status"],
  date = "2026-10-19",
): Visit => ({
  id,
  areaId,
  block,
  address: `Imóvel fictício ${id.slice(-2)}`,
  result: "inspecionado",
  foci,
  container: foci ? "Recipiente de demonstração" : "",
  notes: "",
  date,
  time: "08:30",
  status,
});
export const fixtures: Visit[] = [
  row("DEMO-08", "catole-01", "Q-03", 2, "pending"),
  row("DEMO-07", "catole-01", "Q-02", 0, "pending"),
  row("DEMO-06", "centro-02", "Q-01", 1, "pending"),
  row("DEMO-05", "catole-01", "Q-02", 3, "synced"),
  row("DEMO-04", "catole-01", "Q-01", 1, "synced"),
  row("DEMO-03", "centro-02", "Q-02", 2, "synced"),
  row("DEMO-02", "malvinas-03", "Q-01", 0, "synced", "2026-10-18"),
  row("DEMO-01", "malvinas-03", "Q-02", 0, "synced", "2026-10-16"),
];
export type DemoState = {
  signedIn: boolean;
  areaId: string | null;
  prepared: boolean;
  visits: Visit[];
  network: "online" | "offline";
  syncState: "idle" | "offline" | "failure" | "success";
  lastVisitId: string | null;
};
export const initialState: DemoState = {
  signedIn: false,
  areaId: null,
  prepared: false,
  visits: fixtures,
  network: "online",
  syncState: "idle",
  lastVisitId: null,
};
export type Action =
  | { type: "LOGIN" }
  | { type: "LOGOUT" }
  | { type: "SELECT_AREA"; id: string }
  | { type: "PREPARE" }
  | { type: "CANCEL_VISIT" }
  | { type: "SAVE_VISIT"; visit: Visit }
  | { type: "NETWORK"; network: DemoState["network"] }
  | { type: "SYNC"; accepted: boolean };
export function demoReducer(state: DemoState, action: Action): DemoState {
  switch (action.type) {
    case "LOGIN":
      return { ...state, signedIn: true };
    case "LOGOUT":
      return initialState;
    case "SELECT_AREA":
      return areas.some((a) => a.id === action.id)
        ? { ...state, areaId: action.id, prepared: false }
        : state;
    case "PREPARE":
      return state.signedIn && state.areaId
        ? { ...state, prepared: true }
        : state;
    case "CANCEL_VISIT":
      return { ...state, lastVisitId: null };
    case "SAVE_VISIT":
      if (
        !state.signedIn ||
        !state.prepared ||
        action.visit.areaId !== state.areaId ||
        state.visits.some((v) => v.id === action.visit.id)
      )
        return state;
      return {
        ...state,
        visits: [action.visit, ...state.visits],
        lastVisitId: action.visit.id,
        syncState: "idle",
      };
    case "NETWORK":
      return { ...state, network: action.network, syncState: "idle" };
    case "SYNC":
      if (state.network === "offline")
        return { ...state, syncState: "offline" };
      if (!action.accepted) return { ...state, syncState: "failure" };
      return {
        ...state,
        visits: state.visits.map((v) => ({ ...v, status: "synced" })),
        syncState: "success",
      };
  }
}
export function resolveRoute(path: string, state: DemoState): string {
  path = path.toLowerCase().replace(/\/+$/, "") || "/";
  if (!state.signedIn) return "/acesso";
  if (
    ["/visitas", "/visita/nova", "/visita/confirmacao"].includes(path) &&
    !state.prepared
  )
    return "/preparacao";
  if (path === "/visita/confirmacao" && !state.lastVisitId) return "/visitas";
  return path;
}
export function areaName(id: string) {
  return areas.find((a) => a.id === id)?.name ?? "Microárea";
}
export function formatDate(date: string) {
  const [y, m, d] = date.split("-");
  return `${d}/${m}/${y}`;
}
