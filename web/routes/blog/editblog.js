var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
var MongooseManager = JadeLoader.get("m");
var Settings = JadeLoader.get("settings");

/* GET home page. */
router.get('/', function (req, res, next) {
    req.dispatch('editblog', {}, next);
});

//提交新文章
router.post('/', function (req, res, next) {
    var html = req.body.html,
        articleType = req.body.articleType,
        articleName = req.body.articleName;

    console.log(articleType);
    console.log(JSON.stringify(JadeLoader.get("articleTypes")));

    var index = JadeLoader.get("articleTypes").indexOf(articleType);
    if (index == -1) {
        res.json({error: "文章类型不存在"});
        return;
    }

    if (articleName.length < 3) {
        res.json({error: "文章名称必须超过3个文字"});
        return;
    }

    if (html.length == 0) {
        res.json({error: "文章内容不能为空"});
        return;
    }

    MongooseManager.schema("article").model(function (err, model, release) {
        if (!err) {
            model.insertArticle(req.session.user, articleType, articleName, html, function (err, resp) {
                if (!err) {
                    res.json({error: null, info: "发布成功"});
                } else {
                    console.log(err);
                    res.json({error: "发布失败"});
                }
                release();
            });
        } else {
            res.json({error: "更新失败"});
        }
    });
});

router.post("/deleteBlogType", function (req, res, next) {
    var type = req.body.type;
    if (type == undefined) {
        res.json({error: '参数非法'});
        return;
    }

    MongooseManager.schema("article").model(function (err, model, release) {
        if (!err) {
            model.delType(req.session.user, type, function (err, resp) {
                if (!err) {
                    JadeLoader.get("func_setbar")(req.session.user, function () {
                        res.json({error: null, info: JadeLoader.get("articleTypes")});
                    });
                } else {
                    res.json({error: err});
                }
                release();
            });
        } else {
            res.json({error: err});
        }
        release();
    });
});

//删除博客
router.post("/deleteBlog", function (req, res, next) {
    var id = req.body.id;
    if (id == undefined) {
        res.json({error: '参数非法'});
        return;
    }
    MongooseManager.schema("article").model(function (err, model, release) {
        if (!err) {
            model.deleteOne(id, function (err, resp) {
                if (!err) {
                    res.json({error: null});
                } else {
                    res.json({error: err});
                }
                release();
            })
        } else {
            res.json({error: err});
        }
    });
});

//添加新的博客类型
router.post("/addNewType", function (req, res, next) {
    var type = req.body.type;
    if (type.length == 0) {
        res.json({error: "内容不能为空"});
    } else {
        MongooseManager.schema("article").model(function (err, model, release) {
            if (!err) {
                model.getTypes(req.session.user, function (err, docs) {
                    if (!err && docs) {
                        for (var i = 0, len = docs.length; i < len; ++i) {
                            if (type == docs[i].type) {
                                res.json({error: "此文章类型已存在"});
                                release();
                                return false;
                            }
                        }
                    }
                    model.insertType(req.session.user, type, function (err, resp) {
                        if (!err) {
                            JadeLoader.get("func_setbar")(req.session.user, function () {
                                res.json({error: null, info: JadeLoader.get("articleTypes")});
                            });
                        } else {
                            res.json({error: err});
                        }
                        release();
                    });
                })
            } else {
                res.json({error: err});
            }
        });
    }
});


module.exports = {
    R: router,
    L: [
        "addNewType",
        "deleteBlog",
        'deleteBlogType'
    ]
};
