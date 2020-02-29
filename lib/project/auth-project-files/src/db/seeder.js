const Knex = require('knex');
const config = require('../../knexfile');

const knex = Knex(config[process.env.NODE_ENV]);
const toTruncate = ['notifications', 'tokens', 'users'];

toTruncate.forEach(async (table) => {
    await knex(table).truncate();
});

knex.seed.run().then(() => {
    knex.destroy();
});
