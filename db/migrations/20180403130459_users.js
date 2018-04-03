exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('gender');
    table.date('dob');
    table.integer('zip');
    table.text('img_url');
    table.string('tr_range');
    table.string('lead_range')
    table.integer('start_year');
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
