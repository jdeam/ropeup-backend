const gyms = require('./seed_data/gyms');
const gymsWithoutIds = gyms.map(gym => {
  const { id, ...rest } = gym;
  return rest;
});

exports.seed = function(knex, Promise) {
  return knex('gyms').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('gyms_id_seq', 1, FALSE);"
      );
    })
    .then(function () {
      return knex('gyms').insert(gymsWithoutIds);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('gyms_id_seq', (SELECT MAX(id) FROM gyms));"
      );
    });
};
