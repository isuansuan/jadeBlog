define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    //var BS = require("bootstrap");

    $(document).ready(function () {
        //$('body').css({background: "#808080"});\

        //主页滚动画面设置
        $('#myCarousel').carousel({
            interval: 1000
        });
    });

    //require(["jquery", "lodash"], function ($, _) {
    //
    //});
});