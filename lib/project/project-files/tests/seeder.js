const Knex = require('knex');
const config = require('../knexfile');

const seeder = async () => {
    const knex = Knex(config.testing);
    const toTruncate = [];

    toTruncate.forEach(async (table) => {
        await knex(table).truncate();
    });

    await knex.seed.run()
};

module.exports = seeder;
