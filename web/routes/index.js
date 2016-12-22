var express = require('express');
var router = express.Router();
var JadeLoader = require("../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');

/* GET home page. */
router.get('/', function (req, res, next) {

    req.dispatch('index', {
    }, next);
});

module.exports = router;
