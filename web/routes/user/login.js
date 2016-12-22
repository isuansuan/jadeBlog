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
    var password = req.body.password.trim();

    MongooseManager.schema('user').model(function (err, model, release) {
        if (!err) {
            model.findData(email, Encrypt.md5(password), function (err, username) {
                if (!err) {
                    req.session.user = username;
                }
                req.json({error: err}, next);
                release();
            });
        } else {
            res.redirect("index");
        }
    });
});

module.exports = router;
