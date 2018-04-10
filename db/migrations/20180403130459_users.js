exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.text('img_url');
    table.string('zip');
    table.string('dob');
    table.text('gyms');
    table.string('start_year');
    table.boolean('tr');
    table.boolean('lead');
    table.integer('grade_low');
    table.integer('grade_high');
    table.text('about');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
