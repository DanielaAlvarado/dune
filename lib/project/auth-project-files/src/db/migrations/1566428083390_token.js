exports.up = (knex) => {
    return knex.schema.createTable('tokens', (table) => {
        table.increments('id').primary();
        table.integer('user_id').unsigned().notNullable();
        table.string('token').notNullable();
        table.timestamps(true, true);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('tokens');
};
