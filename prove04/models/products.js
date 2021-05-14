const fs = require('fs');
const {
  dirname
} = require('path');
const path = require('path');
const getdb = require('../util/database').getdb;
const mongodb = require('mongodb');


const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');


module.exports = class Products {

  constructor(id, t, desc, price, imgpath, userId) {
    this._id = id ? new mongodb.ObjectId(id) : null;
    this.title = t;
    this.description = desc;
    this.price = price;
    this.imgpath = imgpath;
    this.userId = userId;
  }

  save() {
    const db = getdb();
    let dpOp;
    if (this._id) {
      dpOp = db.collection('products').updateOne({
        _id: this._id
      }, {
        $set: this
      })
    } else {
      dpOp = db.collection('products').insertOne(this)
    }

    return dpOp.then(result => {
      console.log(result);
    }).catch(err => {
      console.log(err);
    });
  }

  static deleteById(prodId) {
    const db = getdb();
    return db.collection('products').deleteOne({
      _id: new mongodb.ObjectId(prodId)
    }).then(() => {
      console.log('Deleted');
    }).catch(err => {
      console.log(err);
    })
  }

  static fetchAll() {
    const db = getdb();
    return db.collection('products').find().toArray().then(products => {
      return products;
    }).catch(err => {
      console.log(err);
    });
  }

  static findById(prodId) {
    const db = getdb();
    return db.collection('products').find({
      _id: new mongodb.ObjectId(prodId)
    }).next().then(product => {
      return product;
    }).catch(err => {
      console.log(err);
    })
  }
}