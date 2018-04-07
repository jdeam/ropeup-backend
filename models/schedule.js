const knex = require('../db/knex');

function getScheduleByUserId(id) {
  return knex('schedule_items')
    .where({ user_id: id })
    .select('*');
}

module.exports = {
  getScheduleByUserId
};
