var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');

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


module.exports = router;
