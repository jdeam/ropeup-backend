const knex = require('../db/knex');

function getScheduleByUserId(id) {
  return knex('schedule_items')
    .where({ user_id: id })
    .select('*')
    .then(schedule => {
      return schedule.sort((a, b) => {
        return a.day - b.day;
      });
    });
}

module.exports = {
  getScheduleByUserId
};
