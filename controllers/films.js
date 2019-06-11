const db = require('../db/films');

module.exports.getFilms = (req, res) => db.getAllFilms(req, res);

module.exports.addFilm = (req, res) => db.addOne(req, res);

module.exports.deleteFilm = (req, res) => db.deleteOne(req, res);
