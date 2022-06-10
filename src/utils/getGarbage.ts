import dayjs, { Dayjs } from "dayjs";
import { isEvenWednesday } from "./isEvenWednesday";

export const getGarbage = function (dayjsObj: Dayjs) {
  let garbage: string | undefined;
  const day = dayjsObj.day();
  switch (day) {
    // 曜日 0(日曜日)~6(土曜日)
    case 0:
    case 4:
      break;
    case 1:
      garbage = "紙・布類・ダンボール";
      break;
    case 2:
    case 5:
      garbage = "燃やすごみ";
      break;
    case 3:
      if (isEvenWednesday(dayjsObj)) {
        garbage = "金属・陶器・ガラスごみ";
      }
      break;
    case 6:
      garbage = "びん・かん・ペットボトル類";
      break;
    default:
      throw new Error();
  }
  return garbage;
};
