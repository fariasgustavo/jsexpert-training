const { describe, it, before, beforeEach, afterEach } = require('mocha');
const CarService = require('../../src/service/car.service');
const Transaction = require('../../src/entities/transaction.entity');

const { join } = require('path');
const { expect } = require('chai');
const sinon = require('sinon');

const carsDatabase = join(__dirname, './../../database', 'cars.json');

const mocks = {
    validCar: require('../mocks/valid-car.json'),
    validCarCategory: require('../mocks/valid-car-category.json'),
    validCustomer: require('../mocks/valid-customer.json'),
};

describe('CarService Suite Tests', () => {
    let carService = {};
    let sandbox = {};

    before(() => {
        carService = new CarService({ cars: carsDatabase });
    });

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('given a category it should return a available car', async () => {
        const car = mocks.validCar;
        const carCategory = Object.create(mocks.validCarCategory);

        carCategory.carIds = [car.id];

        sandbox.stub(
            carService.carRepository,
            'find'
        ).returns(mocks.validCar);

        sandbox.spy(
            carService,
            'chooseRandomCar'
        );

        const result = await carService.getAvailableCar(carCategory);
        const expected = car;

        expect(carService.chooseRandomCar.calledOnce).to.be.ok;
        expect(carService.carRepository.find.calledWithExactly(car.id)).to.be.ok;
        expect(result).to.be.deep.equal(expected);
    });

    it('should retrive a random position from an array', () => {
        const indexes = [0,1,2,3,4];
        const result = carService.getRandomPositionFromArray(indexes);

        expect(result).to.be.lte(indexes.length).and.be.gte(0);
    });

    it('should choose the first ID from carsIds in carCategory', () => {
        const carCategory = mocks.validCarCategory;

        sandbox.stub(carService, 'getRandomPositionFromArray').returns(0);

        const result = carService.chooseRandomCar(carCategory);

        const expected = carCategory.carIds[0];

        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok;
        expect(result).to.be.equal(expected);
    });

    it('should calculate final amount in real when a carCategory, customer and numberOfDay were given', () => {
        const customer = Object.create(mocks.validCustomer);
        customer.age = 50;

        const carCategory = Object.create(mocks.validCarCategory);
        carCategory.price = 37.6;

        const numberOfDays = 5;

        sandbox.stub(
            carService,
            'taxBasedOnAge'
        ).get(() => [{ from: 40, to: 50, tax: 1.3 }]);

        const expected = carService.currencyFormat.format(244.40);
        const result = carService.calculateFinalPrice(customer, carCategory, numberOfDays);

        expect(result).to.be.deep.equal(expected);
    });

    it('should return a transaction receipt when a customer and a car category were given', async () => {
        const car = Object.create(mocks.validCar);
        const carCategory = {
            ...mocks.validCarCategory,
            price: 37.6,
            carIds: [car.id]
        };

        const customer = Object.create(mocks.validCustomer);
        customer.age = 20;

        const numberOfDays = 5;
        const dueDate = '10 de novembro de 2020';

        const now = new Date(2020, 10, 5);
        
        sandbox.useFakeTimers(now.getTime());
        sandbox.stub(carService, 'getAvailableCar').resolves(car);

        const expectedAmount = carService.currencyFormat.format(206.80);
        const result = await carService.rent(customer, carCategory, numberOfDays);

        const expected = new Transaction({ customer, car, amount: expectedAmount, dueDate });

        expect(result).to.be.deep.equal(expected);
    });
});