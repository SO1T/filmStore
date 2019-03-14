const express = require('express');
const router = express.Router();

const Film = require('../../models/Film');

router.get('/', (req, res) => {
    Film.find()
        .then(films => res.json(films))
});

router.post('/', (req, res) => {
    const { name, year, format, stars } = req.body;
    const newFilm = new Film({
        name, year, format, stars
    });
    newFilm.save().then(item => res.json(item));
});

module.exports = router;