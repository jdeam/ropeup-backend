const usersWithDobs = require('../usersWithUsernames');
const fs = require('fs');

const usersWithoutDobs = usersWithDobs.map(user => {
  const { dob, ...userWithoutDob } = user;
  return userWithoutDob;
});

fs.writeFile('usersWithoutDobs.json', JSON.stringify(usersWithoutDobs));
