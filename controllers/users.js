const model = require('../models');

function getUsers(req, res, next) {
  if (req.query.zip) {
    const zip = req.query.zip;
    const id = req.claim.id;
    return model.users.getUsersByZip(zip, id)
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

// function getUserByToken(req, res, next) {
//   const id = req.claim.user_id;
//   return model.users.getUserById(id)
//     .then(user => {
//       return res.status(200).json({ user });
//     })
//     .catch(err => {
//       return next({ status: 404, message: 'User not found.' });
//     });
// }

// function getUsersByZip(req, res, next) {
//   const zip = req.query.zip;
//   return model.users.getUsersByZip(zip)
//     .then(users => {
//       return res.status(200).json({ users });
//     })
//     .catch(err => {
//       return next({ status: 404, message: 'Users not found.' });
//     });
// }

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
  // getUserByToken,
  // getUsersByZip,
  getUsers,
  getUserById,
  updateUser
};
