const User = require('../models/User');
const Game = require('../models/Game');

module.exports = {
    getAllGames: (req, res) => {
        Game.find()
            .then(games => {
                let unique = [...new Set(games.map(game => game.Title))];
                res.json(unique)
            })
    },
    getAllAccounts: (req, res) => {
        Game.find()
            .then(games => res.json(games))
    },
    addOne: (req, res) => {
        const { Title, Img, TotalHours, Achievements, Price, email, password, userId } = req.body;
        const newGame = new Game({
            Title, Img, TotalHours, Achievements, Price, email, password, userId
        });
        newGame.save().then(game => {
            User.find({ _id: userId }).then(user => {
                const ids = user[0].gamesIds;
                User.updateOne({ _id: userId }, {
                    gamesIds: [...ids, game._id]
                }).catch(err => res.statusCode(500))
            }).catch(err => console.log(err));
            return res.json(game);
        }).catch(err => console.log(err));
    },
    deleteOne: (req, res) => {
        Game.findById(req.params.id)
            .then(game => game.remove().then(() => res.json({ success: true })))
            .catch(err => res.status(404).json({ success: false }));
    },
};
