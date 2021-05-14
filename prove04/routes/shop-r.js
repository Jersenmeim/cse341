const express = require('express');
const router = express.Router();

const productController = require('../controller/products')

router.get('/', productController.getProduct);
router.get('/admin/products', productController.getAdminProduct);

router.get('/products/:productId', productController.getProductbyId)

router.get('/cart', productController.getCart)
router.post('/cart', productController.postCart)
router.post('/cart-delete-item/', productController.cartdeleteitem);

router.get('/orders/', productController.getOrders);
router.post('/create-order/', productController.postOrder);


module.exports = router;