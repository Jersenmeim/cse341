const express = require('express');
const router = express.Router();

const productController = require('../controller/products')
const isAuth = require('../middleware/is-auth');
router.get('/', productController.getProduct);
router.get('/admin/products', productController.getAdminProduct);

router.get('/products/:productId', productController.getProductbyId)

router.get('/cart', isAuth, productController.getCart)
router.post('/cart', isAuth, productController.postCart)
router.post('/cart-delete-item/', isAuth, productController.cartdeleteitem);

router.get('/orders/', isAuth, productController.getOrders);
router.post('/create-order/', isAuth, productController.postOrder);


module.exports = router;