import dayjs, { Dayjs } from "dayjs";

export const isEvenWednesday = (dayjsObj: Dayjs) => {
  let diffWednesday = 3 - dayjsObj.startOf("month").get("day");
  if (diffWednesday < 0) {
    diffWednesday += 7;
  }
  const firstWednesday = dayjsObj.startOf("month").add(diffWednesday, "day");
  const today = dayjsObj.format("YYYYMMDD");
  const secondWednesdayDate = firstWednesday.add(7, "day").format("YYYYMMDD");
  const fourthWednesdayDate = firstWednesday.add(21, "day").format("YYYYMMDD");

  return today === secondWednesdayDate || today === fourthWednesdayDate;
};
