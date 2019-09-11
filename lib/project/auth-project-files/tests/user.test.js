const request = require('supertest');
const app = require('../src/app');
const seeder = require('./seeder');
const User = require('../src/models/user');

let token;

beforeAll(async () => {
    await seeder();
});

test('should sign up new user', async () => {
    const response = await request(app)
        .post('/users')
        .send({
            name: 'New User',
            email: 'newuser@mail.com',
            password: 'secret',
            password_confirmation: 'secret'
        }).
        expect(201);

    const user = await User.query().findById(response.body.user.id);
    expect(user).not.toBeUndefined();
});

test('should not sign up user with invalid email', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Some User',
            email: 'not an email',
            password: 'secret',
            password_confirmation: 'secret'
        })
        .expect(400);
});

test('should not sign up user with existing email', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Some User',
            email: 'user@mail.com',
            password: 'secret',
            password_confirmation: 'secret'
        })
        .expect(400);
});

test('should not sign up user with non matching password confirmation', async () => {
    await request(app)
        .post('/users')
        .send({
            name: 'Some User',
            email: 'user@mail.com',
            password: 'secret',
            password_confirmation: 'not a match'
        })
        .expect(400);
});

test('should log in existing user', async () => {
    const response = await request(app)
        .post('/users/login')
        .send({
            email: 'user@mail.com',
            password: 'secret'
        })
        .expect(201);

    token = response.body.token;
    const tokenCount = await (await User.query().findById(response.body.user.id)).$relatedQuery('tokens').resultSize();
    expect(tokenCount).toEqual(1);
});

test('should not log in user with invalid email', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'not an email',
            password: 'secret'
        })
        .expect(400);
});

test('should not log in non existing user', async () => {
    await request(app)
        .post('/users/login')
        .send({
            email: 'someuser@mail.com',
            password: 'secret'
        })
        .expect(400);
});

test('should log out logged in user', async () => {
    const response = await request(app)
        .delete('/users/logout')
        .set('Authorization', `Bearer ${token}`)
        .send()
        .expect(200);

    const tokenCount = await (await User.query().findById(1)).$relatedQuery('tokens').resultSize();
    expect(tokenCount).toEqual(0);
});
