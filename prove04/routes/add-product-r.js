const path = require('path');
const express = require('express');
const router = express.Router();

//controller imports
const productController = require('../controller/products')


router.get('/admin/add-product', productController.getAddproduct);

router.post('/admin/add-product', productController.postProduct);
router.get('/admin/edit-product/:productId', productController.getEditproduct);
router.post('/admin/edit-product/', productController.postEditProduct);
router.post('/admin/delete-product/', productController.postdeleteproduct);

exports.routes = router;