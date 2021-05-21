const path = require('path');
const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/is-auth');
//controller imports
const productController = require('../controller/products')


router.get('/admin/add-product', isAuth, productController.getAddproduct);
router.post('/admin/add-product', isAuth, productController.postEditProduct);

router.get('/admin/products', isAuth, productController.getAdminProduct);

router.get('/admin/edit-product/:productId', isAuth, productController.getEditproduct);

router.post('/admin/edit-product/', isAuth, productController.postProduct);
router.post('/admin/delete-product/', isAuth, productController.postdeleteproduct);

exports.routes = router;