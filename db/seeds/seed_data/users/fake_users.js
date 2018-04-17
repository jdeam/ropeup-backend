const faker = require('faker');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const zipcodes = require('zipcodes');
const fs = require('fs');

const gyms = require('./gyms');
const phrases = require('./phrases');
const urls = require('./img_urls');
const password = bcrypt.hashSync('test', 10);
const zipSeeds = [98103, 97209];
const zips = zipSeeds.reduce((acc, zip) => {
  const zipList = zipcodes.radius(zip, 20);
  return [ ...acc, ...zipList ];
}, []);

const users = [];

while (users.length<1000) {
  const user = {};

  let username = faker.internet.userName();
  while (username.length > 12) {
    username = faker.internet.userName();
  }
  user.username = username;

  user.img_url = urls[users.length%25];
  user.about = phrases[users.length%25];
  user.email = faker.internet.email();
  user.password = password;

  user.zip = zips[Math.floor(Math.random() * zips.length)];
  user.gym = [ ...gyms ].sort((gymA, gymB) => {
    const distA = zipcodes.distance(user.zip, gymA.zip);
    const distB = zipcodes.distance(user.zip, gymB.zip);
    return distA - distB;
  })[0].id;

  user.dob = moment(
    faker.date.between('1973-04-03', '2000-04-03')
  ).format('YYYY-MM-DD');
  user.start_year = Math.floor(Math.random()*11) + 2008;

  let tr;
  let lead;
  let grade_low;
  let start = Math.floor(Math.random()*3);
  let profile = Math.ceil(Math.random()*3);
  if (profile === 1) {
    tr = true;
    lead = false;
    grade_low = start;
  } else if (profile === 2) {
    tr = true;
    lead = true;
    grade_low = start + Math.floor(Math.random()*2) + 4;
  } else {
    tr = false;
    lead = true;
    grade_low = start + 9;
  }
  user.tr = tr;
  user.lead = lead;
  user.grade_low = grade_low;
  user.grade_high = grade_low + 3;

  users.push(user);
}

fs.writeFile('usersWithUsernames.json', JSON.stringify(users));
