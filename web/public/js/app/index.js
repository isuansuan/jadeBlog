define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    var BS = require("bootstrap");
    var summernote = require("summernote");

    $(document).ready(function () {
        //$('body').css({background: "#808080"});\
        $('#idCarousel').carousel({
            interval: 1000
        });

        $('#summernote').summernote({ lang: 'zh-CN' });
        // $(".modal-dialog").attr("aria-hidden","true");
        // $(".modal-dialog").css({display:"none"});
        // var html = $('#summernote').summernote('code');
    });

    //require(["jquery", "lodash"], function ($, _) {
    //
    //});
});