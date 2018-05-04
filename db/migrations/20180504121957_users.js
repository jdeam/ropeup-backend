exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.string('username').notNullable();
    table.string('email').notNullable();
    table.string('password').notNullable();
    table.string('zip');
    table.string('start_year');
    table.text('img_url');
    table.integer('gym_id');
    table.foreign('gym_id').references('gyms.id')
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
