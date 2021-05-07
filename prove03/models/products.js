const fs = require('fs');
const {
  dirname
} = require('path');
const path = require('path');

const options = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
};
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Products {
  constructor(t, desc, price, imgpath) {
    this.title = t;
    this.description = desc;
    this.price = price;
    this.imgpath = imgpath;
  }

  save() {
    //products.push(this)
    this.created = new Date().toLocaleDateString(undefined, options);
    this.id = Math.random().toString();

    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });

  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static findById(id, cb) {
    getProductsFromFile(products =>{
      const product = products.find(p => p.id === id);
      cb(product);
    });
  }
}