const users = require('./seed_data/usersWithUsernames');
const usersWithoutDobs = users.map(user => {
  const { dob, ...userWithoutDob } = user;
  return user;
});

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', 1, FALSE);"
      );
    })
    .then(function () {
      return knex('users').insert(usersWithoutDobs);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));"
      );
    });
};
