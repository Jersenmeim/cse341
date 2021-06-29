// Routes for W08 Prove Assignment.
const express = require('express');
const router = express.Router();
var jsonEngine = require('../controller/prv08');

router.get('/', jsonEngine.processJson)
// .post('/', jsonEngine.getIndex)
module.exports = router;