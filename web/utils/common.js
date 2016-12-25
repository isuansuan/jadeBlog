/**
 * Created by 郑金玮 on 2016/12/21.
 */
var JadeLoader = require("../../mnode/app").plugin.JadeLoader;
var FileUtil = JadeLoader.Jader('utils').get("file-utils");
var Path = require("path");

/**
 * 获取广告图片数
 */
exports.getAdvertsCnt = function () {
    var path = Path.join(__dirname, "../public/images/adverts");
    if (FileUtil.isDirectory(path)) {
        var files = FileUtil.traverseSync(path);
        return files.length;
    }
    return 0;
};

//获取侧边栏列表数据
function getSideBarList(user, callback) {
    var MongooseManager = JadeLoader.get("m");
    MongooseManager.schema('article').model(function (err, model, release) {
        if (!err) {
            model.getTypes(user, function (err, docs) {
                if (!err) {
                    callback(docs);
                } else {
                    callback([]);
                }
                release();
            })
        } else {
            callback([]);
        }
    });
}


exports.setBar = function(user, callback) {
    getSideBarList(user, function (list) {
        var _bar = [];
        list.forEach(function (l) {
            _bar.push({
                en: l,
                ch: l
            })
        });
        JadeLoader.set('sidebar', _bar);
        JadeLoader.set('articleTypes', list);
        callback();
    })
};