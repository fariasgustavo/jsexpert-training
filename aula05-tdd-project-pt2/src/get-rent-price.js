const getCartByCategory = require("./get-car-by-category");

class ValidationRentPeriodDayError extends Error {
  constructor(message) {
    super(message);
  }
}

const carCategories = {
  suv: {
    models: [
      { name: "Duster", price: 30.2 },
      { name: "Tucson", price: 20.1 },
      { name: "Compass", price: 10.23 },
    ],
  },
  hatch: {
    models: [
      {
        name: "HB20",
        price: 10.14,
      },
      {
        name: "Gol",
        price: 12.4,
      },
      {
        name: "Onix",
        price: 9.2,
      },
    ],
  },
  sedan: {
    models: [
      {
        name: "Sentra",
        price: 14.2,
      },
      {
        name: "Voyage",
        price: 15.45,
      },
      {
        name: "Jetta",
        price: 18.22,
      },
    ],
  },
};

const getRentPrice = (user, category, rentPeriodInDays) => {
  if (rentPeriodInDays < 1 || !rentPeriodInDays) {
    throw new ValidationRentPeriodDayError("rentPeriodInDays is invalid");
  }

  const tax = 1.3;
  const car = getCartByCategory(category, carCategories);

  const total = car.price * tax * rentPeriodInDays;

  return `R$ ${total.toFixed(2).toString().replace(".", ",")}`;
};

module.exports = {
  getRentPrice,
  ValidationRentPeriodDayError,
};
