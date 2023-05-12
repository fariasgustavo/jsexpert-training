const BaseRepository = require('../repository/base/base.repository');
const Tax = require('../entities/tax.entity');
const Transaction = require('../entities/transaction.entity');

const CURRENCY_FORMAT = 'BRL';

class CarService {
    constructor({ cars }) {
        this.taxBasedOnAge = Tax.taxesBasedOnAge;
        this.carRepository = new BaseRepository({ file: cars });
        this.currencyFormat = new Intl.NumberFormat('pt-br', {
            style: 'currency',
            currency: CURRENCY_FORMAT
        })
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

    calculateFinalPrice(customer, carCategory, numberOfDays) {
        const { age } = customer;
        const { price } = carCategory;
        const { tax } = this.taxBasedOnAge.find(item => age >= item.from && age <= item.to);

        const finalPrice = ((tax * price) * numberOfDays)

        return this.currencyFormat.format(finalPrice);
    }

    async rent(customer, carCategory, numberOfDays) {
        const car = await this.getAvailableCar(carCategory);
        const finalPrice = this.calculateFinalPrice(customer, carCategory, numberOfDays);

        const today = new Date();
        today.setDate(today.getDate() + numberOfDays);

        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
        const dueDate = today.toLocaleDateString('pt-br', options);

        const transaction = new Transaction({ amount: finalPrice, car, customer, dueDate });

        return transaction;
    }
}

module.exports = CarService;