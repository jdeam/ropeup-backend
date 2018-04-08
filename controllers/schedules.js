const model = require('../models');

function getScheduleByUserId(req, res, next) {
  const id = req.params.id;
  return model.schedules.getScheduleByUserId(id)
    .then(schedule => {
      return res.status(200).json({ schedule });
    })
    .catch(err => {
      return next({ status: 404, message: 'Schedule not found.' });
    });
}

function addScheduleItem(req, res, next) {

}

function deleteScheduleItem(req, res, next) {
  const { id, itemId } = req.params;
  const { user_id } = req.claim
  if (parseInt(id) !== user_id) throw 'Invalid request.'
  return model.schedules.deleteScheduleItem(itemId)
    .then((deleted) => {
      return res.status(200).json({ message: 'Item deleted.' });
    })
    .catch(err => {
      return next({ status: 404, message: 'Schedule item not found.' });
    });
}

module.exports = {
  getScheduleByUserId,
  addScheduleItem,
  deleteScheduleItem
};
