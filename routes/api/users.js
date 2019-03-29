const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const ctrlUsers = require('../../controllers/users');

const  User = require('../../models/User');


router.post('/', ctrlUsers.registerUser);

router.get('/user', auth, ctrlUsers.authUser);

module.exports = router;