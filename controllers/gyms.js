const model = require('../models');

function getNearbyGyms(req, res, next) {
  const id = req.claim.user_id;
  return model.gyms.getNearbyGyms(id)
    .then(gyms => {
      return res.status(200).json({ gyms });
    })
    .catch(err => {
      return next({ status: 404, message: 'User not found.' });
    });
}

module.exports = {
  getNearbyGyms,
};