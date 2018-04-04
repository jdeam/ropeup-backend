const model = require('../models');

function signup(req, res, next) {
  const { email, password } = req.body;
  return model.users.signup(email, password)
    .then(newUser => {
      return res.status(200).json({ user: newUser[0] });
    })
    .catch(err => {
      return next({ status: 401, message: err });
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    return next({ status: 400, message: 'Missing fields.' });
  }
  return model.users.login(email, password)
    .then(tokenPkg => {
      return res.set('Auth', `Bearer: ${tokenPkg.token}`)
        .send({ message: 'Login successful.', claim: tokenPkg.claim });
    })
    .catch(err => {
      return next({ status: 403, message: err });
    });
}

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
  signup,
  login,
  getUserById,
  getUsersByZip,
  updateUser
};
