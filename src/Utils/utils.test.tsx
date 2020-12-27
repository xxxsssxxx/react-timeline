import { dateFormating } from "./utils";

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