const express = require('express');

const prove10 = require('../controller/prv11');
const router = express.Router();

router.get('/', prove10.getprove10);
router.get('/fetchall', prove10.getAvengers);
router.post('/insert', prove10.postHero);

module.exports = router;