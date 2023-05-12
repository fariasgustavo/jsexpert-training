const {
  getRentPrice,
  ValidationRentPeriodDayError,
} = require("./get-rent-price");

describe("Get Rent Price", () => {
  test("Should return the total rent price greater than 0 when the rentPeriodInDays param is greater than 0", () => {
    const user = {
      age: 50,
    };
    const result = getRentPrice(user, "suv", 1);

    expect(result !== "R$ 0,00").toBeTruthy();
  });

  test("Should return ValidationRentPeriodDayError when the rentPeriodInDays is less than 1", () => {
    const user = {
      age: 50,
    };

    expect(() => {
      getRentPrice(user, "suv", 0);
    }).toThrow(new ValidationRentPeriodDayError("rentPeriodInDays is invalid"));
  });

  test("Should return ValidationRentPeriodDayError when the rentPeriodInDays is undefined", () => {
    const user = {
      age: 50,
    };

    expect(() => getRentPrice(user, "suv", undefined)).toThrow(
      new ValidationRentPeriodDayError("rentPeriodInDays is invalid")
    );
  });

  test("Should return the total rent prince in Brazil currency format", () => {
    const user = {
      age: 50,
    };

    const result = getRentPrice(user, "hatch", 90);

    expect(result).toMatch(new RegExp(/R\$.*,\d\d(\.\d\d)?/g));
  });
});
