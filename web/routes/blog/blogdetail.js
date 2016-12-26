var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
var MongooseManager = JadeLoader.get("m");
var Settings = JadeLoader.get("settings");
var _ = require("lodash");

/* GET home page. */
router.get('/', function (req, res, next) {
    MongooseManager.schema("article").model(function (error, model, release) {
        if (error) {
            req.dispatch('blogdetail', {error: "数据库连接失败", info: ""}, next);
            return;
        }

        model.getArticlesById(req.query.id, function (err, doc) {
            if (!err && doc) {
                req.dispatch("blogdetail", {error: null, info: doc}, next);
            } else {
                req.dispatch('blogdetail', {error: "无文章", info: ""}, next);
            }
            release();
        })
    });
});

router.post('/', function (req, res, next) {
});



module.exports = {
    R: router,
    L: []
};
