const db = require('../db/auth');

module.exports.authUser = (req, res) => db.authUser(req, res);
