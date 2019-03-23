const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FilmSchema = Schema({
    Title: {
        type: String,
        required: true
    },
    Release: {
        type: Number,
        required: true
    },
    Format: {
        type: String,
        required: true
    },
    Stars: {
        type: [String],
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Film = mongoose.model('film', FilmSchema);