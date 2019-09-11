const request = require('supertest');
const app = require('../src/app');
const seeder = require('./seeder');
const <Model> = require('../src/models/<model>');

beforeAll(async () => {
    await seeder();
});

test('should pass test', async () => {

});
