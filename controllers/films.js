const db = require('../models/Film');
const parse = require('./handle/handleFile');

module.exports.getFilms = function (req, res) {
    db.find()
        .then(films => res.json(films))
};

module.exports.addFilm = function (req, res) {
    const { Title, Release, Format, Stars} = req.body;
    const newFilm = new db({
        Title, Release, Format, Stars
    });
    newFilm.save().then(film => res.json(film)).catch(err => res.statusCode(500));
};

module.exports.deleteFilm = function (req, res) {
    db.findById(req.params.id)
        .then(film => film.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false }));
};

module.exports.uploadFile = function (req, res) {
    let films = parse(req.files.file.data.toString());
    films.forEach(({ Title, Release, Format, Stars }) => new db({ Title, Release, Format, Stars }).save());
};