const db = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = {
    regUser: (req, res) => {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(404).json({msg: 'Please enter all fields '});
        }

        db.findOne({ email })
            .then(user => {
                if (user) return res.status(400).json({ msj: 'User already exists '});
                const newUser = new db({ name, email, password });

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
    },
    authUser: (req, res) => {
        db.findById(req.user.id)
            .select('-password')
            .then(user => res.json(user));
    }
};
