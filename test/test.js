const mongoose = require("mongoose");
const Game = require("../models/Game");
const User = require("../models/User");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);
describe('Games', () => {
    describe('/GET game', () => {
        it('it should GET all the games', (done) => {
            chai.request(server)
                .get('/api/games')
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});

describe('Account', () => {
    describe('/GET game', () => {
        it('it should GET all games accounts', (done) => {
            chai.request(server)
                .get('/api/games/store')
                .end((err, res) => {
                    res.body.should.be.a('array');
                    done();
                })
        });
    });
});

describe('Add new game', () => {
    describe('/PUT game', () => {
        it('it should PUT a new game to user profile', (done) => {
            let game = {
                "userId": "5c977f5549b7140398066a60",
                "Title": "Dota2",
                "Img": "1388",
                "TotalHours": 1488,
                "Achievements": "sdfsdf",
                "Price": 100,
                "email": "dpravdivij@gmail.com",
                "password": "qwert54321"
            };

            chai.request(server)
                .put('/api/games/store')
                .set("x-auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTc3ZjU1NDliNzE0MDM5ODA2NmE2MCIsImlhdCI6MTU3ODk4OTExNywiZXhwIjoxNTc5MDI1MTE3fQ.0vcOTF9BEcdEVvBxVvTkWdVvKwT3-t5ZADAmc-UCi0c")
                .send(game)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('Title');
                    res.body.should.have.property('Img');
                    res.body.should.have.property('TotalHours');
                    res.body.should.have.property('Achievements');
                    res.body.should.have.property('Price');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('userId');
                    done();
                })
        });


    });
});

describe('Pay', () => {
    describe('/Pay game', () => {
        it('it should buy a game', (done) => {
            const mail = {
                "email": "den2706@ukr.net",
                "password": "qwerty654321",
                "login": "trdenys",
                "gameId": "5e1cf0b3e8dc914d603db4f7",
                "userId": "5c977f5549b7140398066a60"
            };

            chai.request(server)
                .post('/api/games/store/pay')
                .set("x-auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTc3ZjU1NDliNzE0MDM5ODA2NmE2MCIsImlhdCI6MTU3ODk4OTExNywiZXhwIjoxNTc5MDI1MTE3fQ.0vcOTF9BEcdEVvBxVvTkWdVvKwT3-t5ZADAmc-UCi0c")
                .send(mail)
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql('success');
                    res.body.should.have.property('message').eql('Check your email');
                    done();
                })
        });
    });
});

describe('Delete', () => {
    describe('/DEL game', () => {
        it('it should DEL game from user accounts', (done) => {
            chai.request(server)
                .delete('/api/games/5e1d77b1f27f5741c4b2272b')
                .set("x-auth-token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjOTc3ZjU1NDliNzE0MDM5ODA2NmE2MCIsImlhdCI6MTU3ODk4OTExNywiZXhwIjoxNTc5MDI1MTE3fQ.0vcOTF9BEcdEVvBxVvTkWdVvKwT3-t5ZADAmc-UCi0c")
                .end((err, res) => {
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                })
        });
    });
});

