const db = require('../db/users');

module.exports.registerUser = (req, res) => db.regUser(req, res);

module.exports.authUser = (req, res) => db.authUser(req, res);
