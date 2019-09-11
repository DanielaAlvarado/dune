const factory = require('../factories/factory');
const <Model> = require('../../models/<model>');

exports.seed = async (knex) => {
    <Model>.knex(knex);

    await factory.create('<model>');
};
