exports.seed = function(knex, Promise) {
  return knex('schedule_items').del()
    .then(() => {
      return knex('users').del();
    });
};
