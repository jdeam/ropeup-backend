const schedule_items = require('./seed_data/schedule_items');

exports.seed = function (knex, Promise) {
  return knex('schedule_items').del()
    .then(() => {
      return knex.raw(
        "SELECT setval('schedule_items_id_seq', 1, FALSE);"
      );
    })
    .then(function () {
      return knex('schedule_items').insert(schedule_items);
    })
    .then(() => {
      return knex.raw(
        "SELECT setval('schedule_items_id_seq', (SELECT MAX(id) FROM schedule_items));"
      );
    });
};