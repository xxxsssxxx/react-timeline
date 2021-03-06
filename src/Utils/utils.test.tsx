import { EOrder } from "../enums/enums";
import { addDays } from "../mocks/mocks";
import { dateFormating, sortDates, sortString, isDateObject } from "./utils";

describe("Format date", () => {

  test("Doesnt fail if send a date string as an argument", () => {
    const date = dateFormating("2012/5/6");
    expect(date).toBeDefined();
  });

  test("Correctly formating timeOnly with short minutes as default", () => {
    const date = dateFormating(new Date());
    expect(date).toBeDefined();
    expect(date).toHaveLength(5);
  });

  test("Correctly formatting full date with default localeString value", () => {
    const date = dateFormating(new Date(), false);
    expect(date).toBeDefined();
    expect(date).toHaveLength(10);
  });
});

describe("Sort", () => {
  describe("Dates", () => {

    test("Asc", () => {
      const ascSort = sortDates(new Date(), addDays(4), EOrder.ASC);
      expect(ascSort).toBeLessThan(0);
    });

    test("Desc", () => {
      const descSort = sortDates(new Date(), addDays(4), EOrder.DESC);
      expect(descSort).toBeGreaterThan(0);
    });
  });

  describe("Strings", () => {

    test("Asc", () => {
      const ascSort = sortString("A", "B", EOrder.ASC);
      expect(ascSort).toBeLessThan(0);
    });

    test("Desc", () => {
      const descSort = sortString("A", "B", EOrder.DESC);
      expect(descSort).toBeGreaterThan(0);
    });
  });
});

describe("Is date object", () => {
  test("Return true if its date object", () => {
    const isDate = isDateObject(new Date());
    expect(isDate).toBe(true);
  });
  test("Return false if its date object but invalid date", () => {
    const isDate = isDateObject(new Date("Invalid"));
    expect(isDate).toBe(false);
  });
  test("Return false if its string", () => {
    const isDate = isDateObject(new Date().toLocaleDateString());
    expect(isDate).toBe(false);
  });
});