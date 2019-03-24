const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const ctrlFilms = require('../../controllers/users');

const  User = require('../../models/User');


router.post('/', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(404).json({msg: 'Please enter all fields '});
    }

    User.findOne({ email })
        .then(user => {
            if (!user) return res.status(400).json({ msg: 'User doesn\'t exists '});

            // validate password

            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });
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
                })

        });
});

// router.post('/', ctrlFilms.addFilm);
//
// router.delete('/:id', ctrlFilms.deleteFilm);
//
// router.post('/upload', cors(), ctrlFilms.uploadFile);

module.exports = router;