import { useContext, createContext } from "react";

export const AppContext = createContext<any | null>(null);

export function useAppContext() {
  return useContext(AppContext);
}