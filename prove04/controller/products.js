const Product = require('../models/products')
const mongodb = require('mongodb');

//admin Controller

exports.getAddproduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        editing: false,
        path: '/admin/add-product',
    })
}
exports.getEditproduct = (req, res) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        if (!product) {
            return res.redirect('/');
        }
        res.render('admin/edit-product', {
            path: '/admin/edit-product',
            pageTitle: 'Edit Product',
            editing: editMode,
            product: product
        });
    }).catch(err => {
        console.log(err);
    });
}
exports.postEditProduct = (req, res) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imgpath;
    const updatedDesc = req.body.description;
    const updatedProduct = new Product(
        prodId,
        updatedTitle,
        updatedDesc,
        updatedPrice,
        updatedImageUrl,
        req.user._id

    );
    updatedProduct.save().then(() => {
            console.log('UPDATED PRODUCT!');
            res.redirect('/admin/products');
        })
        .catch(err => console.log(err));;

};
exports.postdeleteproduct = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteById(prodId).then(() => {
        console.log('Delete Item');
        res.redirect('/admin/products');
    });

}
exports.getAdminProduct = (req, res) => {
    Product.fetchAll().then(products => {
        res.render('admin/admin-product', {
            pageTitle: 'List Product',
            list: products,
            path: '/admin/products'
        })
    }).catch(err => {
        console.log(err);
    });
}

//Product Controller

exports.getProduct = (req, res) => {
    Product.fetchAll().then(products => {
        res.render('shop/index', {
            pageTitle: 'Shop Products',
            list: products,
            path: '/'
        })
    }).catch(err => {
        console.log(err);
    });
}
exports.postProduct = (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imgpath = req.body.imgpath;
    const product = new Product(null, title, description, price, imgpath, req.user._id)
    product.save().then(() => {
        res.redirect('/admin/add-product');
    });


}
exports.getProductbyId = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        res.render('shop/productDetail', {
            pageTitle: 'Detail',
            product: product,
            path: '/'
        })
    })
}


//Cart Controller

exports.getCart = (req, res) => {
    req.user
        .getCart()
        .then(products => {
            res.render('shop/add-cart', {
                path: '/cart',
                pageTitle: 'Cart',
                products: products
            });
        })
        .catch(err => console.log(err));
};
exports.cartdeleteitem = (req, res) => {
    const prodId = req.body.productId;
    req.user
        .deleteItemFromCart(prodId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => console.log(err));
};
exports.postCart = (req, res) => {
    const prodId = req.body.productId;
    Product.findById(prodId)
        .then(product => {
            return req.user.addToCart(product);

        })
        .then(result => {
            console.log(result);
            res.redirect('/cart');
        });
};

//Order Controller

exports.postOrder = (req, res) => {
    req.user
        .addOrder()
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => console.log(err));
};
exports.getOrders = (req, res) => {
    req.user
        .getOrders()
        .then(orders => {
            res.render('shop/orders', {
                pageTitle: 'Orders',
                path: '/orders',
                orders: orders
            });
        })
        .catch(err => console.log(err));
};