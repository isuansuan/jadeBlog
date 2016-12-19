var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    req.dispatch('user/login', {
        title: 'login page'
    }, next);
});

router.post("/", function (req, res, next) {

});

module.exports = router;
