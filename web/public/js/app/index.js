define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    var BS = require("bootstrap");

    $(document).ready(function () {
        //$('body').css({background: "#808080"});\
        $('#idCarousel').carousel({
            interval: 1000
        });
    });

    //require(["jquery", "lodash"], function ($, _) {
    //
    //});
});