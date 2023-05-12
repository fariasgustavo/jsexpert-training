const getCarByCategory = (category, categories) => {
  
  let selectedCar;

  do {
    const randomIndex = Math.floor(
      Math.random() * categories[category].models.length
    );

    selectedCar = categories[category].models[randomIndex];
  } while (!selectedCar.available);

  return selectedCar;
};

module.exports = getCarByCategory;
