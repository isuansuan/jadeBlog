/**
 * Created by zhengjinwei on 2016/12/19.
 */
var JadeLoader = require("./mnode/app").plugin.JadeLoader;
var Path = require("path");
var Singleton = require("./mnode/app").utils.Singleton;
var Logger = Singleton.getInstance(require("./mnode/app").utils.Logger, Path.join(__dirname, "./web/config/logger.json"), Path.join(__dirname, "./logs"));

JadeLoader.init(Path.join(__dirname, "./"), true, 360, function () {
    Logger.info("jadeLoader", "jade Loader Finished");

    JadeLoader.set('logger', Logger);//将logger保存
    JadeLoader.set('settings', require("./web/config/settings"));

    var Express = JadeLoader.Jader('plugin').getInstance('express', '127.0.0.1', 8085, Path.join(__dirname, "./web"));

    //定义过滤器中间件，消息先在这里进行过滤，然后进用户
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

    //定义消息派递中间件
    Express.dispatch(function (req, res, next) {
        if (req.template && req.template.data && req.template.render) {
            if (req.session && req.session.user) {
                req.template.data.userName = req.session.user;
            } else {
                req.template.data.userName = '';
            }
            req.template.data.projectName = '郑金玮的博客';
            req.template.data.dateTime = new Date().getFullYear();

            res.render(req.template.render, req.template.data);
        } else {
            next("<h1>invalid request</h1>");
        }
    });

    //启动express
    Express.start(function () {
        Logger.debug('blog', "express already listen on port 8085");
    });

    //拦截异常
    Express.on('uncaughtException', function (err) {
        console.error('blog', 'Got uncaughtException', err.stack, err);
        if (d.env() == 'development') {
            process.exit(1);
        }
    });

    //启用mongoose
    var settings = JadeLoader.get('settings');
    var MongooseManager = JadeLoader.Jader('utils').getInstance('db-mongodb', settings.db.mongodb.host, settings.db.mongodb.port, settings.db.mongodb.db, settings.db.mongodb.auth, Path.join(__dirname, "./web/schemas"));
    MongooseManager.on("error", function (error) {
        Logger.error("blog", "mongoose error" + error);
    });
    MongooseManager.on("connect", function (options) {
        Logger.debug("blog", "success conncted to " + options.host + " on port " + options.port);
    })
});

//监听热加载器的error事件
JadeLoader.on("error", function (err) {
    Logger.error('jadeLoader', err);
});
//监听热加载器的定时加载事件
JadeLoader.on("hotLoad", function (resp) {
    Logger.debug('jadeLoader', resp);
});
