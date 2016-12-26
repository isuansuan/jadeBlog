var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
var MongooseManager = JadeLoader.get("m");
var Settings = JadeLoader.get("settings");
var _ = require("lodash");

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
            req.dispatch('blog', {error: "数据库连接失败"}, next);
            return;
        }

        model.getArticlesByType(author, articleType, function (err, docs) {
            if (!err && docs.length) {
                var list = [];
                for (var i = 0, len = docs.length; i < len; ++i) {
                    var doc = docs[i];
                    var briefs = doc.content.match(/<p>(.*?)<\/p>.*?<pre>(.*?)<\/pre>/g);
                    var _brief = "";
                    if (_.isArray(briefs) && briefs.length) {
                        var _len = (briefs.length == 1) ? 1 : ((briefs.length > 5) ? 5 : briefs.length);
                        for (var j = 0; j < _len; ++j) {
                            _brief += briefs[j];
                        }
                    } else {
                        _brief = doc.name;
                    }
                    list.push({
                        title: doc.name,
                        author: doc.author,
                        content: doc.content,
                        brief: _brief,
                        create_tm: new Date(doc.create_tm).toLocaleString(),
                        update_tm: new Date(doc.update_tm).toLocaleString()
                    });
                }
                req.dispatch('blog', {error: "数据库连接失败", info: list}, next);
            } else {
                req.dispatch('blog', {error: JSON.stringify(err), info: []}, next);
            }
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
