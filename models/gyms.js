const knex = require('../db/knex');
const zipcodes = require('zipcodes');

function getNearbyGyms(id) {
  let userZip;
  return knex('users')
    .where({ id })
    .first()
    .then(user => {
      userZip = user.zip;
      const radiusInMiles = 20;
      const validZips = zipcodes.radius(userZip, radiusInMiles);
      return knex('gyms')
        .whereIn('zip', validZips);
    })
    .then(gyms => {
      return gyms.sort((gymA, gymB) => {
        const distA = zipcodes.distance(userZip, gymA.zip);
        const distB = zipcodes.distance(userZip, gymB.zip);
        return distA - distB;
      });
    });
}

module.exports = {
  getNearbyGyms,
};