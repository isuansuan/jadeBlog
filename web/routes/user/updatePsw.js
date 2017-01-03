var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
var Encrypt = JadeLoader.Jader("utils").get("encrypt-utils");
var MongooseManager = JadeLoader.get('m');
var Settings = JadeLoader.get("settings");
var Common = require("../../public/lib/common");
var EmailHelper = require("../../utils/email");


/* GET home page. */
router.get('/', function (req, res, next) {
    var email = req.query.email;
    var token = req.query.token;
    var error = null;

    if (!email || !token) {
        error = "参数非法"
    }

    if (!error) {
        var _token = JadeLoader.get('findEmail-' + email);
        if (_token != token) {
            error = "token 错误";
        }
    }

    req.dispatch("updatePsw", {
        email: email,
        token: token,
        error: error
    }, next);
});

router.post('/', function (req, res, next) {
    // console.error(req);
    var email = req.body.email;
    var password = req.body.password;
    var token = req.body.token;

    if (!email || !password) {
        res.json({error: "参数错误"});
        return;
    }

    var _token = JadeLoader.get('findEmail-' + email);
    if (_token != token) {
        res.json({error: "token 错误"});
        return;
    }
    //更新
    MongooseManager.schema('user').model(function (err, model, release) {
        if (!err) {
            model.updatePassword(email, password, function (err, resp) {
                res.json({error: err});
                release();
            })
        } else {
            res.json({error: "数据库错误"});
        }
    });
});

module.exports = router;
