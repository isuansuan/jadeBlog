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

    MongooseManager.schema('user').model(function (err, model, release) {
        if (!err) {
            model.insertData(username, email, Encrypt.md5(password), function (err, resp) {
                var error = err ? "注册失败,邮箱已经被注册,请更换邮箱试试" : null;
                req.json({error: error});
                release();
            });
        } else {
            MongooseManager.schema("article").model(function (err, model, release) {
                if (!err) {
                    model.onRegister(username, function (err, resp) {
                        release();
                        res.redirect("index");
                    });
                } else {
                    res.redirect("index");
                }
            });

        }
    });
});

module.exports = router;
