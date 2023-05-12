const BaseRepository = require('../repository/base/base.repository');

class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars });
    }

    async getAvailableCar(carCategory) {
        const carId = this.chooseRandomCar(carCategory);
        const car = this.carRepository.find(carId);

        return car;
    }

    getRandomPositionFromArray(list) {
        return Math.floor(Math.random() * (list.length));
    }

    chooseRandomCar(carCategory) {
        const randomIndex = this.getRandomPositionFromArray(carCategory.carIds);
        const carId = carCategory.carIds[randomIndex];

        return carId;
    }
}

module.exports = CarService;