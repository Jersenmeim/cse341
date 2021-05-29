const {
    validationResult
} = require('express-validator/check');
const Product = require('../models/products');
const Order = require('../models/order');
const mongoose = require('mongoose');



//admin Controller

exports.getAddproduct = (req, res) => {
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        editing: false,
        path: '/admin/add-product',
        hasError: false,
        errorMessage: null,
        validationErrors: []
    })
}
//add new
exports.postEditProduct = (req, res) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log(errors.array());
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Add Product',
            path: '/admin/edit-product',
            editing: false,
            hasError: true,
            product: {
                title: title,
                imageUrl: imageUrl,
                price: price,
                description: description
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    const product = new Product({

        title: title,
        price: price,
        description: description,
        imageUrl: imageUrl,
        userId: req.user
    });
    product
        .save()
        .then(result => {
            // console.log(result);
            console.log('Created Product');
            res.redirect('/admin/products');
        })
        .catch(err => {

            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};
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
            product: product,
            hasError: false,
            errorMessage: null,
            validationErrors: []
        });
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });


}

//Post edit

exports.postProduct = (req, res) => {
    const prodId = req.body.productId;
    const updatedTitle = req.body.title;
    const updatedPrice = req.body.price;
    const updatedImageUrl = req.body.imageUrl;
    const updatedDesc = req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render('admin/edit-product', {
            pageTitle: 'Edit Product',
            path: '/admin/edit-product',
            editing: true,
            hasError: true,
            product: {
                title: updatedTitle,
                imageUrl: updatedImageUrl,
                price: updatedPrice,
                description: updatedDesc,
                _id: prodId
            },
            errorMessage: errors.array()[0].msg,
            validationErrors: errors.array()
        });
    }

    Product.findById(prodId)
        .then(product => {
            if (product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }
            product.title = updatedTitle;
            product.price = updatedPrice;
            product.description = updatedDesc;
            product.imageUrl = updatedImageUrl;
            return product.save().then(result => {
                console.log('UPDATED PRODUCT!');
                res.redirect('/admin/products');
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });

}
exports.getAdminProduct = (req, res) => {
    Product.find({
            userId: req.user._id
        })
        // .select('title price -_id')
        // .populate('userId', 'name')
        .then(products => {
            console.log(products);
            res.render('admin/admin-product', {
                list: products,
                pageTitle: 'Admin Products',
                path: '/admin/products'
            });
        }).catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}
exports.postdeleteproduct = (req, res) => {
    const prodId = req.body.productId;
    Product.deleteOne({
            _id: prodId,
            userId: req.user._id
        })
        .then(() => {
            console.log('DESTROYED PRODUCT');
            res.redirect('/admin/products');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
}




//Product Controller

exports.getProduct = (req, res) => {
    Product.find().then(products => {
        res.render('shop/index', {
            pageTitle: 'Shop Products',
            list: products,
            path: '/',
            isAuthenticated: req.session.isLoggedIn
        })
    }).catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
}

exports.getProductbyId = (req, res) => {
    const prodId = req.params.productId;
    Product.findById(prodId).then(product => {
        res.render('shop/productDetail', {
            pageTitle: 'Detail',
            product: product,
            path: '/',
            isAuthenticated: req.session.isLoggedIn
        })
    })
}


//Cart Controller

exports.getCart = (req, res) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items;
            res.render('shop/add-cart', {
                path: '/cart',
                pageTitle: 'Your Cart',
                products: products,
                isAuthenticated: req.session.isLoggedIn
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
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

exports.cartdeleteitem = (req, res) => {
    const prodId = req.body.productId;
    req.user
        .clearCart(prodId)
        .then(() => {
            res.redirect('/cart');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};


//Order Controller

exports.postOrder = (req, res, next) => {
    req.user
        .populate('cart.items.productId')
        .execPopulate()
        .then(user => {
            const products = user.cart.items.map(i => {
                return {
                    quantity: i.quantity,
                    price: i.price,
                    product: {
                        ...i.productId._doc
                    }
                };
            });
            const order = new Order({
                user: {
                    email: req.user.email,
                    userId: req.user
                },
                products: products
            });
            return order.save();
        })
        .then(result => {
            return req.user.clearCart();
        })
        .then(() => {
            res.redirect('/orders');
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getOrders = (req, res, next) => {
    Order.find({
            'user.userId': req.user._id
        })
        .then(orders => {
            res.render('shop/orders', {
                path: '/orders',
                pageTitle: 'Your Orders',
                orders: orders,
            });
        })
        .catch(err => {
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};