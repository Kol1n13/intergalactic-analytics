import type { LoadType } from "./loadTypes";
import { type PageType } from "./pageType"
import type { StatisticType } from "./statisticType";

export type StoreType = {
    page : PageType;
    updatePage : (newPage : PageType) => void;
    file: File | null;
    setFile: (file: File | null) => void;

    analyticError: string | null;
    setAnalyticError: (msg: string | null) => void;

    currData: StatisticType | null;
    updateCurrData: (data : StatisticType | null) => void; 

    analyticLoading: LoadType;
    updateAnalyticLoading: (load : LoadType) => void;

    generativeLoading: LoadType;
    updateGenerativeLoading: (load : LoadType) => void;

    generativeError: string | null;
    setGenerativeError: (msg: string | null) => void;
}