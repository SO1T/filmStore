const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = Schema({
    Title: {
        type: String,
        required: true
    },
    Img: {
        type: String,
        required: true
    },
    TotalHours: {
        type: Number,
        required: true
    },
    Achievements: {
        type: String,
        required: true
    },
    Price: {
      type: Number,
      required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Film = mongoose.model('game', GameSchema);
