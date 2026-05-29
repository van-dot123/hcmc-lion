import { createContext, useContext, useState } from "react";

const LangCtx = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState("vi");
  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      {children}
    </LangCtx.Provider>
  );
}

export function useLang() {
  return useContext(LangCtx);
}

// Helper: pick vi or kr string
export function t(viStr, krStr) {
  return { vi: viStr, kr: krStr };
}
