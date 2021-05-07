const Product = require('../models/products')


exports.getAddproduct = (req, res, next) => {

    res.render('add-product', {

    })
}

exports.getProductbyId = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId, product => {
        res.render('productDetail', {
            product: product,
            path: '/'
        })
    })

}

exports.postProduct = (req, res, next) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imgpath = req.body.imgpath;

    const product = new Product(title, description, price, imgpath)
    product.save();
    res.redirect('/admin/add-product');

}

exports.getProduct = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('index', {
            title: 'Product Section',
            list: products,
            path: '/'
        })
    });
}