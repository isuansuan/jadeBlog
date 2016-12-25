var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
var MongooseManager = JadeLoader.get("m");
var Settings = JadeLoader.get("settings");

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log(req.query);
    req.dispatch('blog', {}, next);
});

router.post('/', function (req, res, next) {
});


module.exports = {
    R: router,
    L: []
};
