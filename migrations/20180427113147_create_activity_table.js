exports.up = function (knex) {
    return knex.schema.createTable('activities', function (t) {
        t.increments('index').primary();
        t.integer('id').notNullable();
        t.string('name').notNullable();
        t.date('date').notNullable();
        t.json('controls').notNullable();
        t.json('average_data').notNullable();
        t.json('base_data').notNullable();
        t.json('max_Data').notNullable();
        t.json('categorization').notNullable();
        t.json('map').notNullable();
        t.json('details');
        t.json('zones');
        t.json('streams');
        t.timestamps(false, true)
    })
};
exports.down = function (knex) {
    return knex.schema.dropTableIfExists('activities')
};