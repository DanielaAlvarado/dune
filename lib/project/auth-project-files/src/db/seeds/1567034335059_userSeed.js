const factory = require('../factories/factory');
const User = require('../../models/user');

exports.seed = async (knex) => {
    User.knex(knex);

    await factory.create('user', {
        email: 'user@mail.com'
    });
    await factory.createMany('user', 9);
};
