import { create } from "zustand";
import type { PageType } from "../types/pageType";
import type { StoreType } from "../types/storeType";
import type { LoadType } from "../types/loadTypes";
import type { StatisticType } from "../types/statisticType";
import type { RecordType } from "../types/recordType";

export const useStore = create<StoreType>((set, get) => ({
  page: "MainPage",
  updatePage: (newPage: PageType) => set(() => ({ page: newPage })),
  file: null,
  setFile: (file: File | null) => set({ file }),
  analyticError: null,
  setAnalyticError: (msg: string | null) => set({ analyticError: msg }),
  currData: null,
  updateCurrData: (data: StatisticType | null) => set({ currData: data }),
  analyticLoading: "notLoaded",
  updateAnalyticLoading: (load: LoadType) => set({ analyticLoading: load }),
  generativeLoading: "notLoaded",
  updateGenerativeLoading: (load: LoadType) => set({ generativeLoading: load }),
  generativeError: null,
  setGenerativeError: (msg: string | null) => set({ generativeError: msg }),
  history: JSON.parse(localStorage.getItem("aggregated_statistics") || "[]"),

  setHistory: (newHistory) => {
    localStorage.setItem("aggregated_statistics", JSON.stringify(newHistory));
    set({ history: newHistory });
  },

  deleteRecord: (id) => {
    const newHistory = get().history.filter((rec : RecordType) => rec.id !== id);
    localStorage.setItem("aggregated_statistics", JSON.stringify(newHistory));
    set({ history: newHistory });
  },

  clearHistory: () => {
    localStorage.removeItem("aggregated_statistics");
    localStorage.removeItem("stats_counter");
    set({ history: [] });
  },
}));
