import { useStore } from "../store/store";
import { isStatisticType } from "../types/statisticType";

export async function ProcessFile(file: File) {
  let isFirstDecoded = false;
  const formData = new FormData();
  formData.append("file", file);
  const response = await fetch("http://localhost:3000/aggregate?rows=20000", {
    method: "POST",
    body: formData,
  }).catch(() => {
    throw Error();
  });

  if (response && response.body) {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let dataPart;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const decodeData = decoder.decode(value, { stream: true }).split("\n");
      if (!isFirstDecoded) {
        dataPart = JSON.parse(decodeData[1]);
        isFirstDecoded = true;
      } else {
        dataPart = JSON.parse(decodeData[0]);
      }
      if (!isStatisticType(dataPart)) {
        continue;
      }
      useStore.getState().updateCurrData(dataPart);
    }
    return dataPart;
  }
  throw Error("не валидные данные");
}
