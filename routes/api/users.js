const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');

const ctrlFilms = require('../../controllers/users');

const  User = require('../../models/User');


router.post('/', (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(404).json({msg: 'Please enter all fields '});
    }

    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msj: 'User already exists '});
            const newUser = new User({ name, email, password });

            // Create salt & hash

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get('jwtSecret'),
                                { expiresIn: 36000 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            name: user.name,
                                            email: user.email
                                        }
                                    });
                                }
                            )
                        });
                });
            });
        });
});

router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
        .select('-password')
        .then(user => res.json(user));
});

module.exports = router;