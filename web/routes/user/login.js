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
    res.redirect("index");
});

//发送邮件到指定邮箱
function sendEmail(email, text, callback) {

    if(!text){
        var token = JadeLoader.Jader('utils').get('encrypt-utils').md5(email + new Date().getTime());
        JadeLoader.set('findEmail-' + email, token, 10 * 60*1000);//10分钟后自动删除
        //邮件内容为修改密码的URL,token用于请求参数
        var src = "http://localhost:8085/user/updatePsw?token=" + token + "&email=" + email;
        text = "点击 <a href='" + src + "'>" + src + "</a> 找回密码";
    }

    EmailHelper.send(email, text, null, function (err, resp) {
        callback(err, resp);
    });
}

//找回密码
router.post("/findpsw", function (req, res, next) {
    var email = req.body.email;
    if (!Common.isEmail(email)) {
        req.json({error: "邮箱格式非法"});
        return;
    }
    if (email == Settings.user.email) {
        sendEmail(email, "密码是:" + Settings.user.password, function (err, resp) {
            res.json({error: err, info: resp});
        });
    } else {
        MongooseManager.schema('user').model(function (err, model, release) {
            if (!err) {
                model.UserExists(email, function (exits) {
                    if (!exits) {
                        res.json({error: "用户不存在"});
                    } else {
                        sendEmail(email, null, function (err, resp) {
                            res.json({error: err, info: resp});
                        });
                    }
                    release();
                })
            } else {
                res.json({error: "数据库错误"});
            }
        });
    }
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
                            res.redirect("/index");
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

module.exports = {
    R: router,
    L: [
        "findpsw"
    ]
};
