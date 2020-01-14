const db = require('../db/games');
const config = require('../config/default');
const nodemailer = require('nodemailer');

module.exports.getGames = (req, res) => db.getAllGames(req, res);

module.exports.getAccounts = (req, res) => db.getAllAccounts(req, res);

module.exports.addAccount = (req, res) => db.addOne(req, res);

module.exports.pay = (req, res) => {
    const { email, password, login, gameId } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'dpravdivij@gmail.com',
            pass: 'Den777QWERTY'
        }
    });

    const mailOptions = {
        from: 'dpravdivij@gmail.com',
        to: email,
        subject: 'Congratulations!',
        text: `Your credentials.\nLogin: ${login}, Password: ${password}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            res.json({ status: "success", message: "Check your email"})
        }
    });
};

module.exports.deleteGame = (req, res) => db.deleteOne(req, res);
