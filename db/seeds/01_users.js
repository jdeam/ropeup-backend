const users = require('./seed_data/users');

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', 1, FALSE);"
      );
    })
    .then(function () {
      return knex('users').insert(users);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
