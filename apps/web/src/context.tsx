import { createContext, useContext, type Dispatch } from "react";
import type { Action, DemoState } from "./domain/demo";
export const DemoContext = createContext<{
  state: DemoState;
  dispatch: Dispatch<Action>;
} | null>(null);
export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) throw new Error("Contexto ausente");
  return context;
}
