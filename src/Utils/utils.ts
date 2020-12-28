import { EOrder } from "../enums/enums";
type TDate = string | Date | number;

export const isDateObject = (date: unknown): boolean => {
  return Object.prototype.toString.call(date) === "[object Date]";
};

export const dateFormating = (
  date: Date | string,
  timeOnly: boolean = true,
  options?: Intl.DateTimeFormatOptions | undefined,
  locales: string = "en-GB"
): string => {
  if (typeof date === "string") {
    date = new Date(date);
  }
  let applyedOptions = options;
  if (timeOnly) {
    applyedOptions = options || {
      hour: "numeric",
      minute: "numeric",
      hour12: false
    };
  }
  // For the performance issues
  const dateInt = new Intl.DateTimeFormat(locales, applyedOptions);
  return dateInt.format(date);
};

export const sortDates = (a: TDate, b: TDate, order: string): number => {
  const aDate = new Date(a).getTime();
  const bDate = new Date(b).getTime();
  if (order === EOrder.DESC) {
    return bDate - aDate;
  }
  return aDate - bDate;
};

export const sortString = (a: string, b: string, order: string): number => {
  if (order === EOrder.DESC) {
    return b.localeCompare(a);
  }
  return a.localeCompare(b);
};
