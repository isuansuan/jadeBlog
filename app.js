/**
 * Created by zhengjinwei on 2016/12/19.
 */
var JadeLoader = require("./mnode/app").plugin.JadeLoader;
var Path = require("path");

JadeLoader.init(Path.join(__dirname, "./"), true, 360, function () {
    console.log("jade Loader Finished");
    var Express = JadeLoader.Jader('plugin').getInstance('express', '127.0.0.1', 8085, Path.join(__dirname, "./web"));

    Express.use(function (req, res, next) {
        var url = req.originalUrl;
        if (!Express.routesList[url]) {
            res.redirect("/index");
        } else {
            if (url == '/user/login') {
                if (req.session && req.session.user) {
                    res.redirect("/index");
                } else {
                    next();
                }
            } else {
                next();
            }
        }
    });

    Express.start(function () {
        console.log("ready");
    });

    Express.on('uncaughtException', function (err) {
        console.error('Got uncaughtException', err.stack, err);
        if (d.env() == 'development') {
            process.exit(1);
        }
    });
});

JadeLoader.on("error", function (err) {
    console.error(err);
});
JadeLoader.on("hotLoad", function (resp) {
    console.log(resp);
});
