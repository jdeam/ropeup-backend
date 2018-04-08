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

function addScheduleItem(item) {

}

function deleteScheduleItem(id) {
  return knex('schedule_items')
    .where({ id })
    .del();
}

module.exports = {
  getScheduleByUserId,
  addScheduleItem,
  deleteScheduleItem
};
