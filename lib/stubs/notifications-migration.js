exports.up = (knex) => {
    return knex.schema.createTable('notifications', (table) => {
        table.increments('id').primary();
        table.integer('<model>_id').unsigned().notNullable();
        table.text('content').notNullable();
        table.integer('seen').notNullable().defaultTo(0);
        table.timestamps(true, true);
    });
};

exports.down = (knex) => {
    return knex.schema.dropTableIfExists('notifications');
};
