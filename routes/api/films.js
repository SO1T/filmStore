const express = require('express');
const router = express.Router();
const cors = require('cors');

const ctrlFilms = require('../../controllers/films');


router.get('/', ctrlFilms.getFilms);

router.post('/', ctrlFilms.addFilm);

router.delete('/:id', ctrlFilms.deleteFilm);

router.post('/upload', cors(), ctrlFilms.uploadFile);

module.exports = router;