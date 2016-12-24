define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    var BS = require("bootstrap");

    $(document).ready(function () {
        //window.alert(0);
        //$('body').css({background: "#808080"});\
        $('#idCarousel').carousel({
            interval: 2000
        });

        $(".panel-heading").click(function (e) {
            /*切换折叠指示图标*/
            $(this).find("span").toggleClass("glyphicon-chevron-down");
            $(this).find("span").toggleClass("glyphicon-chevron-up");
        });
    });

    //require(["jquery", "lodash"], function ($, _) {
    //
    //});
});