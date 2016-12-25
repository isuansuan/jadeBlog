var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
var Encrypt = JadeLoader.Jader("utils").get("encrypt-utils");
var MongooseManager = JadeLoader.get('m');
var Settings = JadeLoader.get("settings");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.redirect("index");
});

router.post("/", function (req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    if (Settings.user.use) {
        if (email == Settings.user.email && password == Encrypt.md5(Settings.user.password)) {
            req.session.user = Settings.user.username;
            req.json({error: null});
        } else {
            req.json({error: "login failed"});
        }
    } else {
        MongooseManager.schema('user').model(function (err, model, release) {
            if (!err) {
                model.findData(email, password, function (err, username) {
                    if (!err) {
                        req.session.user = username;

                        JadeLoader.get("func_setbar")(username, function () {
                            req.json({error: err});
                        });
                    } else {
                        req.json({error: err});
                    }
                    release();
                });
            } else {
                req.json({error: "db failed"});
            }
        });
    }
});

module.exports = router;
