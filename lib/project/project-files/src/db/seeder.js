const Knex = require('knex');
const config = require('../../knexfile');

const knex = Knex(config.development);
const toTruncate = [];

toTruncate.forEach(async (table) => {
    await knex(table).truncate();
});

knex.seed.run().then(() => {
    knex.destroy();
});
