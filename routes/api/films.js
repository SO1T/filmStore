const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const ctrlFilms = require('../../controllers/films');


router.get('/', ctrlFilms.getFilms);

router.post('/', auth, ctrlFilms.addFilm);

router.delete('/:id', auth, ctrlFilms.deleteFilm);

module.exports = router;
