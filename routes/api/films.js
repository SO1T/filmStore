const express = require('express');
const router = express.Router();
const cors = require('cors');
const auth = require('../../middleware/auth');

const ctrlFilms = require('../../controllers/films');


router.get('/', ctrlFilms.getFilms);

router.post('/', auth, ctrlFilms.addFilm);

router.delete('/:id', auth, ctrlFilms.deleteFilm);

router.post('/upload', cors, ctrlFilms.uploadFile);

module.exports = router;