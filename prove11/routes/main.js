const express = require('express');
const router = express.Router();

const mainCont = require('../controller/index')

router.get('/', mainCont.getIndex)

module.exports = router;