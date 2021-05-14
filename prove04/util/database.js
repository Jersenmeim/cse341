const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db
const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    family: 4
};
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://jersenmeim:j3rs3nm31m1196@cluster0.qnn4a.mongodb.net/shop?retryWrites=true&w=majority";


const mongoConnect = (callback) => {
    MongoClient.connect(MONGODB_URL, options).then(client => {
        console.log('Connected!');

        _db = client.db();

        callback();
    }).catch(err => {
        console.log(err);
        throw (err);
    });
}

const getdb = () => {
    if (_db) {
        return _db;
    }

    throw 'No Database Found';
}


exports.mongoConnect = mongoConnect;
exports.getdb = getdb;