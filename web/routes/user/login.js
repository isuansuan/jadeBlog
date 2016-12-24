var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
//var Encrypt = JadeLoader.Jader("utils").get("encrypt-utils");
var MongooseManager = JadeLoader.get('m');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect("index");
});

//获取侧边栏列表数据
function getSideBarList(user, callback) {
    MongooseManager.schema('article').model(function (err, model, release) {
        if (!err) {
            model.getTypes(user, function (err, docs) {
                if (!err) {
                    callback(docs);
                } else {
                    callback([]);
                }
                release();
            })
        } else {
            callback([]);
        }
    });
}


function setBar(user,callback){
    getSideBarList(user,function(list){
        var _bar = [];
        list.forEach(function (l) {
            _bar.push({
                en: l,
                ch: l
            })
        });
        JadeLoader.set('sidebar', _bar);
        callback();
    })
}

JadeLoader.set("func_setbar",setBar);

router.post("/", function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    MongooseManager.schema('user').model(function (err, model, release) {
        if (!err) {
            model.findData(email, password, function (err, username) {
                if (!err) {
                    req.session.user = username;

                    setBar(username,function(){
                        req.json({error: err});
                    });
                } else {
                    req.json({error: err});
                }
                release();
            });
        } else {
            res.redirect("index");
        }
    });
});

module.exports = router;
