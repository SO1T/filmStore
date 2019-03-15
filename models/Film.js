const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    format: {
        type: String,
        required: true
    },
    stars: {
        type: [String],
        required: true
    }
});

module.exports = Film = mongoose.model('film', FilmSchema);