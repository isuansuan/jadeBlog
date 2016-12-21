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