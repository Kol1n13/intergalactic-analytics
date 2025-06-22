import type { LoadType } from "./loadTypes";
import { type PageType } from "./pageType";
import type { RecordType } from "./recordType";
import type { StatisticType } from "./statisticType";

export type StoreType = {
  page: PageType;
  updatePage: (newPage: PageType) => void;
  file: File | null;
  setFile: (file: File | null) => void;

  analyticError: string | null;
  setAnalyticError: (msg: string | null) => void;

  currData: StatisticType | null;
  updateCurrData: (data: StatisticType | null) => void;

  analyticLoading: LoadType;
  updateAnalyticLoading: (load: LoadType) => void;

  generativeLoading: LoadType;
  updateGenerativeLoading: (load: LoadType) => void;

  generativeError: string | null;
  setGenerativeError: (msg: string | null) => void;

  history: RecordType[];
  setHistory: (history: RecordType[]) => void;
  deleteRecord: (id: number) => void;
  clearHistory: () => void;
};
