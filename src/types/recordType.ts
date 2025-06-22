import type { StatisticType } from "./statisticType";

export type RecordType = {
  fileName: string;
  date: Date;
  isProccessed: boolean;
  data: StatisticType | null;
  id: number;
};
