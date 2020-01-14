const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const ctrlGames = require('../../controllers/games');


router.get('/', ctrlGames.getGames);

router.get('/store', ctrlGames.getAccounts);

router.put('/store', auth, ctrlGames.addAccount);

router.post('/store/pay', auth, ctrlGames.pay);

router.delete('/:id', auth, ctrlGames.deleteGame);

module.exports = router;
