var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
var MongooseManager = JadeLoader.get("m");
var Settings = JadeLoader.get("settings");
var _ = require("lodash");
var Async = require("async");

/* GET home page. */
router.get('/', function (req, res, next) {
    var articleType = req.query.type;

    var author = Settings.user.use ? Settings.user.username : (req.session.user ? req.session.user : null);

    if (!author) {
        req.dispatch('blog', {error: "无权限"}, next);
        return;
    }
    MongooseManager.schema("article").model(function (error, model, release) {
        if (error) {
            req.dispatch('blog', {error: "db error", info: [], totalCnt: 0, perPageCnt: 1, page: 1}, next);
            return;
        }

        var totalCnt = 0;
        var list = [];

        var perPageCnt = 6;//每页2个
        var skip = perPageCnt * ((req.query.page || 1) - 1);
        Async.auto({
            "getCnt": function (cb) {
                model.getArticlesCountByType(author, articleType, function (err, cnt) {
                    totalCnt = err ? 0 : cnt;
                    cb(null);
                });
            },
            "getArticles": ["getCnt", function (resp, cb) {
                model.getArticlesByType(author, articleType, skip,perPageCnt, function (err, docs) {
                    if (!err && docs.length) {
                        for (var i = 0, len = docs.length; i < len; ++i) {
                            var doc = docs[i];
                            list.push({
                                id: doc.id,
                                title: doc.name,
                                author: doc.author,
                                content: doc.content,
                                brief: doc.brief,
                                type: articleType,
                                create_tm: new Date(doc.create_tm).toLocaleString(),
                                update_tm: new Date(doc.update_tm).toLocaleString()
                            });
                        }
                    }
                    cb(null);
                });
            }]
        }, function (err, resp) {

            var c = parseInt(totalCnt / perPageCnt);//去整数部分
            var e = totalCnt % perPageCnt;//取余数部分

            var pageCnt = c + ((e == 0) ? 0 : 1);//总页数

            req.dispatch('blog', {
                error: err,
                info: list,
                totalCnt: totalCnt,
                perPageCnt: perPageCnt,
                page: req.query.page || 1,
                pageCnt: pageCnt,
                type: articleType
            }, next);
            release();
        });
    });
});

router.post('/', function (req, res, next) {
});


module.exports = {
    R: router,
    L: []
};
