const faker = require('faker');
const bcrypt = require('bcryptjs');
const moment = require('moment');
const fs = require('fs');

const zipcodes = require('zipcodes');
const zipSeeds = [98103, 97209, 94129, 92705, 84109, 80301];
const zips = zipSeeds.reduce((acc, zip) => {
  const zipList = zipcodes.radius(zip, 20);
  return [ ...acc, ...zipList ];
}, []);

let start_year = 2008;
const years = [];
while (start_year <= 2018) {
  years.push(start_year);
  start_year += 1;
}

const gyms = require('./gyms');
const phrases = require('./phrases');

const grades = [
  '5.7', '5.8', '5.9', '5.10a', '5.10b', '5.10c', '5.10d', '5.11a',
  '5.11b', '5.11c', '5.11d', '5.12a', '5.12b', '5.12c', '5.12d'
];

const urls = require('./img_urls');
const password = bcrypt.hashSync('test', 10);

const users = [];

while (users.length<500) {
  const user = {};

  user.img_url = urls[users.length%20];
  user.about = phrases[users.length%20];

  user.first_name = faker.name.firstName();
  user.last_name = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = password;

  user.zip = zips[Math.floor(Math.random() * zips.length)];
  user.gyms = [ ...gyms ].sort((gymA, gymB) => {
    const distA = zipcodes.distance(user.zip, gymA.zip);
    const distB = zipcodes.distance(user.zip, gymB.zip);
    return distA - distB;
  })[0].name;

  const randomDate = faker.date.between('1973-04-03', '2000-04-03');
  user.dob = moment(randomDate).format('YYYY-MM-DD');

  user.start_year = years[Math.floor(Math.random() * years.length)];

  let tr;
  let lead;
  let range;
  let i = Math.floor(Math.random()*3);
  let randomNum = Math.ceil(Math.random()*3);
  if (randomNum === 1) {
    tr = true;
    lead = false;
    range = grades.slice(0, 6);
  } else if (randomNum === 2) {
    tr = true;
    lead = true;
    range = grades.slice(4,11);
  } else {
    tr = false;
    lead = true;
    range = grades.slice(9);
  }
  user.tr = tr;
  user.lead = lead;
  user.grade_low = range[i];
  user.grade_high = range[i+3]

  users.push(user);
}

fs.writeFile('users.json', JSON.stringify(users));
