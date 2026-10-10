import { createContext, useContext } from "react";

export const CaseContext = createContext(null);

export function useCase() {
  const ctx = useContext(CaseContext);
  if (!ctx) throw new Error("useCase must be used inside <CaseProvider>");
  return ctx;
}