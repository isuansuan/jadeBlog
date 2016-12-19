var express = require('express');
var router = express.Router();
var JadeLoader = require("../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');

/* GET home page. */
router.get('/', function (req, res, next) {

    req.template = {
        render: 'index',
        data: {
            title: 'Express'
        }
    };

    //Logger.debug("blog","index page called");
    next();
});

module.exports = router;
