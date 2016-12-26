/**
 * Created by 郑金玮 on 2016/12/19.
 * 博客
 */
var Mongoose = require('mongoose');


//Schema.Types.Mixed
var schemeTable = {
    id: {type: Number, index: {unique: true}},
    type: {type: String, required: true, index: true},
    name: {type: String, required: true, index: true},
    content: {type: String, required: true},
    author: {type: String, required: true, index: true},
    update_tm: {type: Date, default: Date.now,index: true},
    create_tm: {type: Date, default: Date.now, index: true},
    extra: {type: Mongoose.Schema.Types.Mixed}
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
    this.find(condition, view).sort({update_tm: -1}).lean().exec(function (err, docs) {
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

//schema.pre('save', function (next) {
//    var self = this;
//    this.findByIdAndUpdate({_id: 'entityId'}, {$inc: {seq: 1}}, function (error, doc) {
//        if (error) {
//            return next(error);
//        }
//        self.id = doc.seq;
//        next();
//    });
//});

schema.statics.getTypes = function (author, callback) {
    //var condition = {
    //    author: author
    //};
    //
    //this.aggregate.({"$match": condition},{
    //    $group: {
    //        _id: {"type": "$type"}
    //    }
    //},function (err, docs) {
    //    callback(err, docs)
    //});

    this.findOne({author: author, type: "articleList"}).lean().exec(function (err, doc) {
        if (!err && doc) {
            callback(err, JSON.parse(doc.extra));
        } else {
            callback(err, []);
        }
    });
};

schema.statics.insertType = function (author, type, callback) {
    var self = this;
    this.findOne({author: author, type: "articleList"}).lean().exec(function (err, doc) {
        if (!err && doc) {
            var articleList = JSON.parse(doc.extra);
            var index = articleList.indexOf(type);
            if (index == -1) {
                articleList.push(type);
                self.findByIdAndUpdate({_id: doc._id}, {$set: {extra: JSON.stringify(articleList)}}, function (err, resp) {
                    callback(err, resp);
                });
            } else {
                callback("文章类型已存在");
            }
        } else {
            callback(err);
        }
    });
};

schema.statics.getCount = function (callback) {
    this.count({}, function (err, c) {
        callback(err ? 0 : c);
    });
};

schema.statics.insertArticle = function (author, type, name, content, callback) {
    var self = this;
    this.getCount(function (cnt) {
        var newData = new self({
            id: cnt + 1,
            author: author,
            type: type,
            name: name,
            content: content
        });
        newData.save(function (err, resp) {
            callback(err, resp);
        });
    });
};

schema.statics.onRegister = function (author, callback) {
    var self = this;
    this.getCount(function (cnt) {
        var d = new self({
            id: cnt + 1,
            type: "articleList",
            name: "articleList",
            content: "articleList",
            author: author,
            extra: JSON.stringify([])
        });

        d.save(function (err, resp) {
            callback(err, resp);
        })
    });
};


module.exports = {
    "table": 'article',
    'schema': schema
};