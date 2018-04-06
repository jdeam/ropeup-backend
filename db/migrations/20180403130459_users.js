exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('first_name');
    table.string('last_name');
    table.string('dob');
    table.integer('zip');
    table.text('img_url');
    table.integer('start_year');
    table.boolean('tr');
    table.boolean('lead');
    table.string('grade_low');
    table.string('grade_high');
    table.text('gyms');
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
