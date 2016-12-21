/**
 * Created by 郑金玮 on 2016/12/19.
 * 页面 边栏数据模型
 */
var Mongoose = require('mongoose');

//Schema.Types.Mixed
var schemeTable = {
    nickname: {type: String, default: "", index: 1},//
    email: {type: String, required: true, index: {unique: true}},//
    password: {type: String, required: true},//
    create_tm: {type: Date, default: Date.now}
};

var schema = new Mongoose.Schema(schemeTable, {});

//schema.statics.getData = function (condition, view, callback) {
//    this.find(condition, view).sort({index: 1}).lean().exec(function (err, docs) {
//        callback(err, docs);
//    })
//};

schema.statics.insertData = function (email, password, callback) {
    var newData = new this({
        email: email,
        password: password
    });

    newData.save(function (err, resp) {
        callback(err, resp);
    })
};


module.exports = {
    "table": 'user',
    'schema': schema
};