const model = require('../model/prv09');

exports.getdata = (pageNum, callback) => {
    // Page 1 will have an offset of 0
    const offset = 10 * (pageNum - 1);
    model.getdata(offset, (data) => {
        callback(data);
    });

}