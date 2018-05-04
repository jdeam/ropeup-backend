exports.up = function(knex, Promise) {
  return knex.schema.createTable('gyms', table => {
    table.increments();
    table.string('name').notNullable();
    table.string('zip').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('gyms');
};
