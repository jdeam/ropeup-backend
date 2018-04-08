const model = require('../models');

function getUsers(req, res, next) {
  if (req.query.zip) {
    const { zip } = req.query;
    const { user_id } = req.claim;
    return model.users.getUsersByZip(zip, user_id)
      .then(climbers => {
        return res.status(200).json({ climbers });
      })
      .catch(err => {
        return next({ status: 404, message: 'Users not found.' });
      });
  } else {
    const id = req.claim.user_id;
    return model.users.getUserById(id)
      .then(user => {
        return res.status(200).json({ user });
      })
      .catch(err => {
        return next({ status: 404, message: 'User not found.' });
      });
  }
}

function updateUser(req, res, next) {
  const id = req.params.id;
  const userInfo = req.body;
  if (parseInt(id) !== req.claim.user_id) throw 'Invalid request.'
  return model.users.updateUser(id, userInfo)
    .then(user => {
      return res.status(200).json({ user });
    })
    .catch(err => {
      return next({ status: 404, message: 'User not found.' });
    });
}

module.exports = {
  getUsers,
  updateUser
};
