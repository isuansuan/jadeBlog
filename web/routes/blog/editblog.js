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

router.post('/', function (req, res, next) {
    var html = req.body.html,
        articleType = req.body.articleType,
        articleName = req.body.articleName;

    res.json({data: "上传成功"});
});

router.post("/addNew", function (req, res, next) {
    var type = req.body.type;
    if (type.length == 0) {
        res.json({data: "内容不能为空"});
    } else {
        MongooseManager.schema("article").model(function (err, model, release) {
            if (!err) {
                model.getTypes(req.session.user, function (err, docs) {
                    if (!err && docs) {
                        for (var i = 0, len = docs.length; i < len; ++i) {
                            if (type == docs[i].type) {
                                res.json({data: "此文章类型已存在"});
                                release();
                                return false;
                            }
                        }
                    }
                    model.insertType(req.session.user, type, function (err, resp) {
                        if (!err) {
                            JadeLoader.get("func_setbar")(req.session.user, function () {
                                res.json({data: "添加成功"});
                            });
                        } else {
                            res.json({data: err});
                        }
                        release();
                    });
                })
            } else {
                res.json({data: err});
            }
        });
    }
});


module.exports = {
    R: router,
    L: [
        "addNew"
    ]
};
