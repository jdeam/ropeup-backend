exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.text('img_url');
    table.integer('zip');
    table.string('dob');
    table.text('gyms');
    table.integer('start_year');
    table.boolean('tr');
    table.boolean('lead');
    table.string('grade_low');
    table.string('grade_high');
    table.text('about');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
