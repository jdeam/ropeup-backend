const model = require('../models');

function signup(req, res, next) {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return next({ status: 400, message: 'Missing fields.' });
  }
  return model.users.signup(first_name, last_name, email, password)
    .then(token => {
      return res.set('Auth', `Bearer: ${token}`)
        .send({ message: 'Signup successful.' });
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
    .then(token => {
      return res.set('Auth', `Bearer: ${token}`)
        .send({ message: 'Login successful.' });
    })
    .catch(err => {
      return next({ status: 403, message: err });
    });
}

module.exports = {
  signup,
  login,
};
