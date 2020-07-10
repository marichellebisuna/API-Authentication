const jwt = require('jsonwebtoken');
const createError = require('http-errors');

module.exports = {
 signAccessToken: (userId) => {
  return new Promise((resolve, reject) => {
   const payload = {};
   const secret = 'secret';
   const options = {
    expiresIn: '1d',
    issuer: 'pickurpage.com',
    audience: userId,
   };
   jwt.sign(payload, secret, options, (err, token) => {
    if (err) reject(err);
    resolve(token);
   });
  });
 },
};
