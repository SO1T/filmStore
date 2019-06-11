const db = require('../models/Film');

module.exports = {
    getAllFilms: (req, res) => {
        db.find()
            .then(films => res.json(films))
    },
    addOne: (req, res) => {
        const { Title, Release, Format, Stars} = req.body;
        const newFilm = new db({
            Title, Release, Format, Stars
        });
        newFilm.save().then(film => res.json(film)).catch(err => res.statusCode(500));
    },
    deleteOne: (req, res) => {
        db.findById(req.params.id)
            .then(film => film.remove().then(() => res.json({ success: true })))
            .catch(err => res.status(404).json({ success: false }));
    }
};
