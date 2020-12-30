import { EOrder } from "../enums/enums";
export type TDate = string | Date;

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

export const treatAsUTC = (date: string | Date): Date => {
  var result = new Date(date);
  result.setMinutes(result.getMinutes() - result.getTimezoneOffset());
  return result;
};

export const daysBetween = (startDate: TDate, endDate: TDate): number => {
  var millisecondsPerDay = 24 * 60 * 60 * 1000;
  const daysBetween = (treatAsUTC(endDate).getTime() - treatAsUTC(startDate).getTime()) / millisecondsPerDay;
  return daysBetween;
};

export const minutesBetween = (startDate: TDate, endDate: TDate): number => {
  const diff = Math.abs(treatAsUTC(startDate).getTime() - treatAsUTC(endDate).getTime());
  const minutesBetween = Math.floor((diff/1000)/60);
  return minutesBetween;
};
