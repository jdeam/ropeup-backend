const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const zipcodes = require('zipcodes');

function getUserByEmail(email) {
  return knex('users')
    .where({ email })
    .first();
}

function signup(first_name, last_name, email, password) {
  return getUserByEmail(email)
    .then(user => {
      if (user) throw 'User already exists.';
      return bcrypt.hash(password, parseInt(process.env.WORK_FACTOR));
    })
    .then(hashedPassword => {
      return knex('users')
        .insert({
          first_name,
          last_name,
          email,
          password: hashedPassword
        })
        .returning('*')
    })
    .then(user => {
      const claim = { user_id: user[0].id };
      const fourWeeks = 2419200000;
      const token = jwt.sign(
        claim,
        process.env.JWT_SECRET,
        { expiresIn: Date.now() + fourWeeks }
      );
      return token;
    });
}

function login(email, password) {
  let validUser
  return getUserByEmail(email)
    .then(user => {
      if (!user) throw 'Please enter a valid email.';
      validUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(passwordIsValid => {
      if (!passwordIsValid) throw 'Invalid password.';
      const claim = { user_id: validUser.id };
      const fourWeeks = 2419200000;
      const token = jwt.sign(
        claim,
        process.env.JWT_SECRET,
        { expiresIn: Date.now() + fourWeeks }
      );
      return token;
    });
}

function getUserById(id) {
  return knex('users')
    .where({ id })
    .select(
      'img_url',
      'first_name',
      'last_name',
      'dob',
      'zip',
      'gyms',
      'tr',
      'lead',
      'grade_low',
      'grade_high',
      'start_year',
      'about'
    )
    .first();
}

function getUsersByZip(zip) {
  const zips = zipcodes.radius(zip, 20)
  return knex('users')
    .whereIn('zip', zips)
    .select(
      'img_url',
      'first_name',
      'last_name',
      'dob',
      'zip',
      'gyms',
      'tr',
      'lead',
      'grade_low',
      'grade_high',
      'start_year',
      'about'
    )
    .then(users => {
      return users.sort((userA, userB) => {
        distA = zipcodes.distance(zip, userA.zip);
        distB = zipcodes.distance(zip, userB.zip);
        return distA - distB;
      });
    });
}

function updateUser(id, userInfo) {
  return knex('users')
    .where({ id })
    .update(userInfo)
    .returning('*');
}

module.exports = {
  signup,
  login,
  getUserById,
  getUsersByZip,
  updateUser
};
