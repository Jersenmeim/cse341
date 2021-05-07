const path = require('path');
const express = require('express');
const router = express.Router();

//controller imports
const productController = require('../controller/products')


router.get('/admin/add-product', productController.getAddproduct);

router.post('/admin/add-product', productController.postProduct);

exports.routes = router;
