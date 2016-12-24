var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
var Encrypt = JadeLoader.Jader("utils").get("encrypt-utils");
var MongooseManager = JadeLoader.get('m');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect("index");
});

router.post("/", function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var username = req.body.username;

    MongooseManager.schema('user').model(function (err, model1, release1) {
        if (!err) {
            model1.insertData(username, email, Encrypt.md5(password), function (err, resp) {
                var error = err ? "注册失败,邮箱已经被注册,请更换邮箱试试" : null;
                if (error) {
                    req.json({error: error});
                } else {
                    MongooseManager.schema("article").model(function (err, model, release) {
                        if (!err) {
                            model.onRegister(username, function (err, resp) {
                                if (!err) {
                                    req.json({error: err});
                                } else {
                                    model1.remove({email: email}, function (err, resp) {
                                        req.json({error: "文章数据初始化失败"});
                                    });
                                }
                                release();
                                release1();
                            });
                        } else {
                            req.json({error: err});
                            release1();
                        }
                    });
                }
            });
        } else {
            req.json({error: err});
        }
    });
});

module.exports = router;
