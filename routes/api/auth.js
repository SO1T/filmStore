const express = require('express');
const router = express.Router();

const ctrlAuth = require('../../controllers/auth');

router.post('/', ctrlAuth.authUser);

module.exports = router;