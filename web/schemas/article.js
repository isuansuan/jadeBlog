/**
 * Created by 郑金玮 on 2016/12/19.
 * 博客
 */
var Mongoose = require('mongoose');

//Schema.Types.Mixed
var schemeTable = {
    id: {type: Number, index: {unique: true}},
    type: {type: String, required: true, index: 1},
    name: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: String, required: true, index: 1},
    update_tm: {type: Date, default: Date.now},
    create_tm: {type: Date, default: Date.now}
};

var schema = new Mongoose.Schema(schemeTable, {});

/**
 * 获取指定作者的指定类型的文章
 * @param author
 * @param type
 * @param callback
 */
schema.statics.getArticlesByType = function (author, type, callback) {
    var condition = {
        author: author,
        type: type
    };

    var view = {
        _id: 0
    };
    this.find(condition, view).lean().exec(function (err, docs) {
        callback(err, docs);
    })
};

/**
 * 获取作者的所有文章
 * @param author
 * @param callback
 */
schema.statics.getArticlesByUser = function (author, callback) {
    var condition = {
        author: author
    };

    var view = {
        _id: 0
    };
    this.find(condition, view).lean().exec(function (err, docs) {
        callback(err, docs);
    })
};


/**
 * 获取作者的一篇文章
 * @param author
 * @param type
 * @param name
 * @param callback
 */
schema.statics.getOneArticle = function (author, type, name, callback) {
    var condition = {
        author: author,
        type: type,
        name: name
    };

    var view = {
        _id: 0
    };
    this.findOne(condition, view).lean().exec(function (err, docs) {
        callback(err, docs);
    })
};

schema.statics.pre('save', function (next) {
    var doc = this;
    counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: {seq: 1}}, function (error, counter) {
        if (error){
            return next(error);
        }
        doc.id = counter.seq;
        next();
    });
});

schema.statics.insertArticle = function (author, type, name, content, callback) {
    var newData = new this({
        author: author,
        type: type,
        name: name,
        content: content
    });
    newData.save(function (err, resp) {
        callback(err, resp);
    })
};


module.exports = {
    "table": 'article',
    'schema': schema
};