const model = require('../models');

function getScheduleByUserId(req, res, next) {
  const { id } = req.params;
  return model.schedules.getScheduleByUserId(id)
    .then(schedule => {
      return res.status(200).json({ schedule });
    })
    .catch(err => {
      return next({ status: 404, message: 'Schedule not found.' });
    });
}

function addScheduleItem(req, res, next) {
  const { id } = req.params;
  const { user_id } = req.claim;
  if (parseInt(id) !== user_id) throw 'Invalid request.'
  const item = { ...req.body, user_id };
  return model.schedules.addScheduleItem(item)
    .then(() => {
      return res.status(200).json({ message: 'Item inserted.' });
    })
    .catch(err => {
      return next({ status: 400, message: 'Item could not be added.' });
    });
}

function deleteScheduleItem(req, res, next) {
  const { id, itemId } = req.params;
  const { user_id } = req.claim
  if (parseInt(id) !== user_id) throw 'Invalid request.'
  return model.schedules.deleteScheduleItem(itemId)
    .then(() => {
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
