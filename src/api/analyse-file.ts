import { useStore } from "../store/store";
import { ProcessFile } from "./process-file";

export async function AnalyseFile(file: File) {
  await ProcessFile(file)
    .then((partedData) => {
      useStore.getState().updateAnalyticLoading("loaded");
      const storedStats = localStorage.getItem("aggregated_statistics");
      const statsCounter = localStorage.getItem("stat_counter");
      if (storedStats && statsCounter) {
        const parsedStats = JSON.parse(storedStats);
        parsedStats.push({
          fileName: file.name,
          date: new Date(),
          isProccessed: true,
          data: partedData,
          id: Number.parseInt(JSON.parse(statsCounter)) + 1,
        });
        localStorage.setItem(
          "aggregated_statistics",
          JSON.stringify(parsedStats),
        );
        localStorage.setItem(
          "stat_counter",
          JSON.stringify(Number.parseInt(JSON.parse(statsCounter)) + 1),
        );
      } else {
        localStorage.setItem(
          "aggregated_statistics",
          JSON.stringify([
            {
              fileName: file.name,
              date: new Date(),
              isProccessed: true,
              data: partedData,
              id: 1,
            },
          ]),
        );
        localStorage.setItem("stat_counter", "1");
      }
    })
    .catch(() => {
      useStore.getState().setAnalyticError("упс, что-то пошло не так");
      useStore.getState().updateAnalyticLoading("loaded");
      const storedStats = localStorage.getItem("aggregated_statistics");
      const statsCounter = localStorage.getItem("stat_counter");
      if (storedStats && statsCounter) {
        const parsedStats = JSON.parse(storedStats);
        parsedStats.push({
          fileName: file.name,
          date: new Date(),
          isProccessed: false,
          data: null,
          id: Number.parseInt(JSON.parse(statsCounter)) + 1,
        });
        localStorage.setItem(
          "aggregated_statistics",
          JSON.stringify(parsedStats),
        );
        localStorage.setItem(
          "stat_counter",
          JSON.stringify(Number.parseInt(JSON.parse(statsCounter)) + 1),
        );
      } else {
        localStorage.setItem(
          "aggregated_statistics",
          JSON.stringify([
            {
              fileName: file.name,
              date: new Date(),
              isProccessed: false,
              data: null,
              id: 1,
            },
          ]),
        );
        localStorage.setItem("stat_counter", "1");
      }
    });
}
