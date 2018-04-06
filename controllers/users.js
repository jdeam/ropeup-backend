const model = require('../models');

function getUserById(req, res, next) {
  const id = req.params.id;
  return model.users.getUserById(id)
    .then(user => {
      return res.status(200).json({ user });
    })
    .catch(err => {
      return next({ status: 404, message: 'User not found.' });
    });
}

function getUsersByZip(req, res, next) {
  const zip = req.params.zip;
  return model.users.getUsersByZip(zip)
    .then(users => {
      return res.status(200).json({ users });
    })
    .catch(err => {
      return next({ status: 404, message: 'Users not found.' });
    });
}

function updateUser(req, res, next) {
  const id = req.params.id;
  const userInfo = req.body;
  return model.users.updateUser(id, userInfo)
    .then(user => {
      return res.status(200).json({ user });
    })
    .catch(err => {
      return next({ status: 404, message: 'User not found.' });
    });
}

module.exports = {
  getUserById,
  getUsersByZip,
  updateUser
};
