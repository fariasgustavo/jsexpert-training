const { describe, it, before, beforeEach, afterEach } = require('mocha');
const CarService = require('../../src/service/car.service');

const { join } = require('path');
const assert = require('assert');
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
});