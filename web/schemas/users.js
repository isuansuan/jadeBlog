/**
 * Created by 郑金玮 on 2016/12/19.
 * 用户 模型表
 */
var Mongoose = require('mongoose');

//Schema.Types.Mixed
var schemeTable = {
    username: {type: String, default: "用户", index: 1},//
    email: {type: String, required: true, index: {unique: true}},//
    password: {type: String, required: true},//
    create_tm: {type: Date, default: Date.now}
};

var schema = new Mongoose.Schema(schemeTable, {});

/**
 * 查询一个指定用户
 * @param email
 * @param password
 * @param callback
 */
schema.statics.findData = function (email, password, callback) {
    this.findOne({email: email}, {_id: 0, create_tm: 0}).lean().exec(function (err, doc) {
        if (!err && doc) {
            if (doc.password == password) {
                callback(null, doc.username);
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

/**
 * 获取用户数量
 * @param callback
 */
schema.statics.getUserCount = function (callback) {
    this.count({}, function (err, c) {
        callback(err ? 0 : c);
    });
};

/**
 * 插入有个新用户
 * @param username
 * @param email
 * @param password
 * @param callback
 */
schema.statics.insertData = function (username, email, password, callback) {
    var newData = new this({
        email: email,
        password: password,
        username: username
    });

    newData.save(function (err, resp) {
        callback(err, resp);
    });
};


module.exports = {
    "table": 'user',
    'schema': schema
};