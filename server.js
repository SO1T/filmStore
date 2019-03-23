const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const films = require('./routes/api/films');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(fileUpload());
app.use(cors());

// Body parser middlware
app.use(bodyParser.json());

// DB config
const db = require('./config/keys').mongoURI;

// Connect to Mongo

mongoose.connect(db)
    .then(() => console.log('Connected to mongo'))
    .catch((err) => console.log(err));

app.use('/api/films', films);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on ${port}`));