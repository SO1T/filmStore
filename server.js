const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const config = require('config');

const films = require('./routes/api/films');
const users = require('./routes/api/users');
const auth = require('./routes/api/auth');

const app = express();

app.use(cors());

// Body parser middlware
app.use(express.json());

// DB config
const db = config.get('mongoURI');

// Connect to Mongo

mongoose.Promise = global.Promise;

mongoose.connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true
    })
    .then(() => console.log('Connected to mongo'))
    .catch((err) => console.log(err));

app.use('/api/films', films);
app.use('/api/users', users);
app.use('/api/auth', auth);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));