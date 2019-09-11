const request = require('supertest');
const app = require('../src/app');

test('should return 200 status for root path', async () => {
    await request(app)
        .get('/')
        .send().
        expect(200);
});
