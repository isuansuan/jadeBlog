define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    var BS = require("bootstrap");
    var summernote = require("summernote");

    $(document).ready(function () {
        $('#summernote').summernote({lang: 'zh-CN'});

        $(".ote-editor .modal-dialog").css({display:"none"});
        //$(".modal").attr("aria-hidden","true");
        $(".modal").css({display:"none"});
        // var html = $('#summernote').summernote('code');
    });
});