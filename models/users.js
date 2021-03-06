const knex = require('../db/knex');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const zipcodes = require('zipcodes');
const schedules = require('./schedules');
const gyms = require('./gyms');

function getUserByEmail(email) {
  return knex('users')
    .where({ email })
    .first();
}

function getUserByUsername(username) {
  return knex('users')
    .where({ username })
    .first();
}

function signup(username, email, password) {
  return getUserByUsername(username)
    .then(user => {
      if (user) throw 'A user with that username already exists.';
      return getUserByEmail(email);
    })
    .then(user => {
      if (user) throw 'A user with that email already exists.';
      return bcrypt.hash(password, parseInt(process.env.WORK_FACTOR));
    })
    .then(hashedPassword => {
      return knex('users')
        .insert({
          username,
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
  let validUser;
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
  let user;
  return knex('users')
    .where({ id })
    .select(
      'id',
      'email',
      'img_url',
      'username',
      'zip',
      'gym_id',
      'tr',
      'lead',
      'grade_low',
      'grade_high',
      'start_year',
      'about'
    )
    .first()
    .then(foundUser => {
      user = foundUser;
      return schedules.getScheduleByUserId(user.id);
    })
    .then(schedule => {
      user.schedule = schedule;
      const radiusInMiles = 20;
      const validZips = zipcodes.radius(user.zip, radiusInMiles);
      return knex('gyms')
        .whereIn('zip', validZips);
    })
    .then(gyms => {
      user.gyms = gyms.sort((gymA, gymB) => {
        const distA = zipcodes.distance(user.zip, gymA.zip);
        const distB = zipcodes.distance(user.zip, gymB.zip);
        return distA - distB;
      });
      return user;
    });
}

function getUsersByZip(zip, id) {
  let users;
  const radiusInMiles = 10;
  const zips = zipcodes.radius(zip, radiusInMiles);
  return knex('users')
    .whereIn('zip', zips)
    .select(
      'id',
      'email',
      'img_url',
      'username',
      'zip',
      'gym_id',
      'tr',
      'lead',
      'grade_low',
      'grade_high',
      'start_year',
      'about'
    )
    .then(result => {
      users = result;
      return users.map(user => {
        return schedules.getScheduleByUserId(user.id);
      });
    })
    .then(schedulePromises => {
      return Promise.all(schedulePromises);
    })
    .then(schedules => {
      return users.map((user, i) => {
          user.schedule = schedules[i];
          return user;
        })
        .sort((userA, userB) => {
          distA = zipcodes.distance(zip, userA.zip);
          distB = zipcodes.distance(zip, userB.zip);
          return distA - distB;
        })
        .filter(user => user.id !== id);
    });
}

function updateUser(id, userInfo) {
  return knex('users')
    .where({ id })
    .update(userInfo);
}

module.exports = {
  signup,
  login,
  getUserById,
  getUsersByZip,
  updateUser,
};
