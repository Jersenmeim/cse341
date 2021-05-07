const express = require('express');
const router = express.Router();

const productController = require('../controller/products')

router.get('/', productController.getProduct);

router.get('/products/:productId', productController.getProductbyId)

module.exports = router;