const express = require('express');
const router = express.Router();
const cors = require('cors');
const parse = require('../handle/handleFile');

const Film = require('../../models/Film');

router.get('/', (req, res) => {
    Film.find()
        .sort({ date: -1 })
        .then(films => res.json(films))
});

router.post('/', (req, res) => {
    const { Title, Release, Format, Stars } = req.body;
    const newFilm = new Film({
        Title, Release, Format, Stars
    });
    newFilm.save().then(item => res.json(item)).catch(err => res.statusCode(500));
});

router.delete('/:id', (req, res) => {
    Film.findById(req.params.id)
        .then(film => film.remove().then(() => res.json({ success: true })))
        .catch(err => res.status(404).json({ success: false} ))
});

router.post('/upload', cors(), (req, res) => {
    let films = parse(req.files.file.data.toString());
    // console.log(films);
    films.forEach(({ Title, Release, Format, Stars }) => new Film({ Title, Release, Format, Stars }).save());
});

module.exports = router;