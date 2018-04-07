exports.up = function(knex, Promise) {
  return knex.schema.createTable('schedule_items', table => {
    table.increments();
    table.integer('user_id').notNullable();
    table.foreign('user_id').references('users.id');
    table.integer('day').notNullable();
    table.integer('start').notNullable();
    table.integer('end').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('schedule_items');
};
