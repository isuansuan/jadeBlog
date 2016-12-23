var express = require('express');
var router = express.Router();
var JadeLoader = require("../../../mnode/app").plugin.JadeLoader;
var Logger = JadeLoader.get('logger');
var formidable = require('formidable');
var fs = require("fs");
var Path = require("path");
var FileUtil = JadeLoader.Jader("utils").get("file-utils");
/* GET home page. */
router.post('/', function (req, res, next) {
    var fields = [];
    var files = [];
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.maxFieldsSize = 2 * 1024 * 1024;
    form.keepExtensions = true;                     //保留后缀格式
    form.uploadDir = Path.join(__dirname, '../../public/uploads');

    FileUtil.createDirectory(form.uploadDir);

    form.on('field', function (field, value) {
        fields.push(field);
    }).on('file', function (field, file) {
        files.push(file);
    }).on('end', function () {
        var _fileName = null;
        files.map(function (file) {        /*重命名文件*/
            _fileName = new Date().getTime() + "_" + file.name;
            fs.rename(file.path, form.uploadDir + "/" + _fileName, function (err) {
                if (err) {
                    throw err;
                }
            });
        });
        res.end(JSON.stringify({url: "/uploads/" + _fileName}));
    });
    form.parse(req);
});

module.exports = router;
