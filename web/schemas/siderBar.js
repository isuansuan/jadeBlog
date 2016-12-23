/**
 * Created by 郑金玮 on 2016/12/19.
 * 页面 边栏数据模型
 */
var Mongoose = require('mongoose');

//Schema.Types.Mixed
var schemeTable = {
    en: {type: String, required: true},//英文
    ch: {type: String, required: true},//中文
    index: {type: Number, unique: true, default: 1},//顺序
    desc: {type: String, default: ''},//描述
    create_tm: {type: Date, default: Date.now}
};

var schema = new Mongoose.Schema(schemeTable, {});

schema.statics.getData = function (condition, view, callback) {
    this.find(condition, view).sort({index: 1}).lean().exec(function (err, docs) {
            callback(err, docs);
        })
};

schema.statics.insertData = function (data, callback) {
    var newData = new this(data);
    newData.save(function (err, resp) {
        callback(err, resp);
    })
};


module.exports = {
    "table": 'sidebar',
    'schema': schema
};