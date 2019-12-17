const db = require('../models/User');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = {
    authUser: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({msg: 'Please enter all fields '});
        }

        db.findOne({ email })
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
    },
};
