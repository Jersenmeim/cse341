const path = require('path');
const express = require('express');
const {
    body
} = require('express-validator/check');


//controller imports
const productController = require('../controller/products')
const router = express.Router();
const isAuth = require('../middleware/is-auth');


router.get('/admin/add-product', isAuth, productController.getAddproduct);
router.get('/admin/products', isAuth, productController.getAdminProduct);

//router.post('/admin/add-product', isAuth, productController.postEditProduct);
router.post(
    '/admin/add-product',
    [
        body('title')
        .isString()
        .isLength({
            min: 3
        })
        .trim(),
        body('imageUrl').isURL(),
        body('price').isFloat(),
        body('description')
        .isLength({
            min: 5,
            max: 400
        })
        .trim()
    ],
    isAuth,
    productController.postEditProduct
);
router.get('/admin/edit-product/:productId', isAuth, productController.getEditproduct);

router.post(
    '/admin/edit-product/',
    [
        body('title')
        .isString()
        .isLength({
            min: 3
        })
        .trim(),
        body('imageUrl').isURL(),
        body('price').isFloat(),
        body('description')
        .isLength({
            min: 5,
            max: 400
        })
        .trim()
    ],
    isAuth,
    productController.postProduct
);
router.post('/admin/delete-product/', isAuth, productController.postdeleteproduct);

exports.routes = router;