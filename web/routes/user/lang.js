var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    console.error(req.params);
    req.session.lang = req.query.lang;
    res.redirect("index");
});

router.post("/", function (req, res, next) {

});

module.exports = router;
