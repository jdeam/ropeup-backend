const users = require('./seed_data/usersWithoutDobs');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', 1, FALSE);"
      );
    })
    .then(function () {
      return knex('users').insert(users.slice(0, 500));
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
