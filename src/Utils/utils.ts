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
