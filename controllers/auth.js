const model = require('../models');

function signup(req, res, next) {
  const { email, password } = req.body;
  return model.users.signup(email, password)
    .then(tokenPkg => {
      return res.set('Auth', `Bearer: ${tokenPkg.token}`)
        .send({ message: 'Signup successful.', claim: tokenPkg.claim });
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

module.exports = {
  signup,
  login
};
