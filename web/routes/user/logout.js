var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    req.session.user = null;
    res.redirect("index");
    //req.dispatch('index', {
    //    title: '郑金玮的博客'
    //}, next);
});

router.post("/", function (req, res, next) {

});

module.exports = router;
