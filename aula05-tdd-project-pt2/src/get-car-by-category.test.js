const getCarByCategory = require("./get-car-by-category");

describe("Get Car by Category", () => {
  const categories = {
    suv: {
      models: [
        { name: "Duster", price: 30.2, available: true },
        { name: "Tucson", price: 20.1, available: false },
        { name: "Compass", price: 10.23, available: true },
      ],
    },
    hatch: {
      models: [
        {
          name: "HB20",
          price: 10.14,
          available: true,
        },
        {
          name: "Gol",
          price: 12.4,
          available: false,
        },
        {
          name: "Onix",
          price: 9.2,
          available: true,
        },
      ],
    },
    sedan: {
      models: [
        {
          name: "Sentra",
          price: 14.2,
          available: false,
        },
        {
          name: "Voyage",
          price: 15.45,
          available: true,
        },
        {
          name: "Jetta",
          price: 18.22,
          available: true,
        },
      ],
    },
  };

  afterEach(() => {
    jest.spyOn(global.Math, "random").mockRestore();
  });

  test("Should return the first car element from some category when Math.random is less than 0.334", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.333);
    const result = getCarByCategory("suv", categories).name;

    expect(result).toStrictEqual("Duster");
  });

  test("Should return the last car element from some category when Math.random is more than 0.666", () => {
    jest.spyOn(global.Math, "random").mockReturnValue(0.667);
    const result = getCarByCategory("hatch", categories).name;

    expect(result).toStrictEqual("Onix");
  });
});
