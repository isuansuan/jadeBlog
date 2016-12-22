/**
 * Created by 郑金玮 on 2016/12/19.
 * 页面 边栏数据模型
 */
var Mongoose = require('mongoose');

//Schema.Types.Mixed
var schemeTable = {
    nickname: {type: String, default: "用户", index: 1},//
    email: {type: String, required: true, index: {unique: true}},//
    password: {type: String, required: true},//
    create_tm: {type: Date, default: Date.now}
};

var schema = new Mongoose.Schema(schemeTable, {});

schema.statics.findData = function (email, password, callback) {
    this.find({email: email}, {_id: 0, create_tm: 0}).limit(1).lean().exec(function (err, doc) {
        if (!err && doc) {
            if (doc.password == password) {
                callback(null, doc.nickname);
            } else {
                callback('密码错误', null);
            }
        } else {
            if (err) {
                callback(err, doc);
            } else {
                callback('用户名不存在', null);
            }
        }
    })
};

schema.statics.getUserCount = function (callback) {
    this.count({}, function (err, c) {
        callback(err ? 0 : c);
    });
};

schema.statics.insertData = function (email, password, callback) {
    var newData = new this({
        email: email,
        password: password
    });

    this.getUserCount(function (cnt) {
        newData.nickname = '用户' + (cnt + 1);
        newData.save(function (err, resp) {
            callback(err, resp);
        });
    });
};


module.exports = {
    "table": 'user',
    'schema': schema
};