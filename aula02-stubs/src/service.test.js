const Service = require('./service');
const mocks = {
    tatooine: require('../mocks/tatooine.json'),
}
const sinon = require('sinon');
const { deepStrictEqual } = require("assert");

const MOCKED_ENDPOINT_1 = 'https://swapi.dev/api/planets/1/';

;(async () => {
    const service = new Service();
    const stub = sinon.stub(service, service.makeRequest.name);

    stub.withArgs(MOCKED_ENDPOINT_1).resolves(mocks.tatooine);

    {
        const expected = {
            name: 'Tatooine',
            surfaceWater: '1',
            appearedIn: 5
        }

        const result = await service.getPlanets(MOCKED_ENDPOINT_1);

        deepStrictEqual(result,expected);
    }
})()