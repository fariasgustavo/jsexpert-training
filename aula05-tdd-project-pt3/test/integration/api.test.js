const { describe, it, before, beforeEach, afterEach } = require('mocha');
const request = require('supertest');
const { expect } = require('chai');
const sinon = require('sinon');
const Server = require('../../src/api');
const Transaction = require('../../src/entities/transaction.entity');

const mocks = {
    validCar: require('../mocks/valid-car.json'),
    validCarCategory: require('../mocks/valid-car-category.json'),
    validCustomer: require('../mocks/valid-customer.json'),
};

describe('API Suite Test', () => {
    let sandbox = {};

    beforeEach(() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });


    it('GET /rent', async () => {
        const server = new Server();
        const response = await request(server.app())
            .post('/rent')
            .send({
                customer: mocks.validCustomer,
                carCategory: mocks.validCarCategory,
                numberOfDays: 10
            })
            .expect(200);
    });
});