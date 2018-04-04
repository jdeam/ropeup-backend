const faker = require('faker');
const bcrypt = require('bcryptjs');
const fs = require('fs');

const zipcodes = require('zipcodes');
const zipSeeds = [98103, 97209, 94129, 92705, 84109, 80301];
const zips = zipSeeds.reduce((acc, zip) => {
  const zipList = zipcodes.radius(zip, 20);
  return [ ...acc, ...zipList ];
}, []);

const genders = [ 'male', 'female' ];

let start_year = 2008;
const years = [];
while (start_year <= 2018) {
  years.push(start_year);
  start_year += 1;
}

const grades = [
  '5.7', '5.8', '5.9', '5.10a', '5.10b', '5.10c', '5.10d', '5.11a',
  '5.11b', '5.11c', '5.11d', '5.12a', '5.12b', '5.12c', '5.12d'
];
const urls = require('./img_urls');
const password = bcrypt.hashSync('test', 10);

const users = [];

while (users.length<100) {
  const user = {};

  user.first_name = faker.name.firstName();
  user.last_name = faker.name.lastName();
  user.dob = faker.date.between('1958-04-03', '2000-04-03');
  user.gender = genders[Math.floor(Math.random() * genders.length)];
  user.zip = zips[Math.floor(Math.random() * zips.length)];

  user.img_url = urls[users.length%10];
  user.email = faker.internet.email();
  user.password = password;

  const i = Math.floor(Math.random() * grades.length);
  user.tr_range = (
    `${grades[i]}-${grades[i+3 < grades.length-1 ? i+3 : grades.length-1]}`
  );
  user.lead_range = i > 4 ? `${grades[i-3]}-${grades[i]}` : null;
  user.start_year = years[Math.floor(Math.random() * years.length)];

  users.push(user);
}

fs.writeFile('users.json', JSON.stringify(users));
