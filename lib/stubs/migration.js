exports.up = (knex) => {
    return knex.schema.createTable('<table_name>', (table) => {
        table.increments('id').primary();
        table.timestamps(true, true);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('<table_name>');
};
