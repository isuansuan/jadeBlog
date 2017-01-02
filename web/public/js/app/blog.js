define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    var BS = require("bootstrap");
    var summernote = require("summernote");
    var googlePrettify = require('googlePrettify');
    var jqueryZclip = require("jqueryZclip");
    $(document).ready(function () {

        function getSelectText(t) {
            if (window.getSelection) {
                if (t.selectionStart != undefined && t.selectionEnd != undefined) {
                    return t.value.substring(t.selectionStart, t.selectionEnd);
                } else {
                    return "";
                }
            } else {
                return document.selection.createRange().text;
            }
        }

        var lastCopyTm = 0;
        $('.code-copy-link').zclip({
            path: '/lib/jquery/ZeroClipboard.swf',
            beforeCopy: function () {
            },
            copy: function () {//复制内容
                var $code = $(this).parent('span').parent('.code-header').siblings("pre");
                return $code.text();
            },
            afterCopy: function () {//复制成功
                // window.alert("复制成功");
                if (new Date() - lastCopyTm > 1000) {
                    lastCopyTm = new Date();
                    $.jGrowl('复制成功', {sticky: false, header: "", life: 1000, position: 'center'});
                }
            }
        });


        function addPrettyNums() {
            $("pre").each(function () {
                var cls = $(this).attr('class');
                if (cls.indexOf('linenums') < 0) {
                    cls += ' linenums';
                    $(this).attr('class', cls);
                }
            });
        }

        // addPrettyNums();
        prettyPrint();

        $('.btn-danger.delBlogBtn').on("click", function () {
            var id = $(this).val();
            if (id == undefined) {
                $.jGrowl('参数非法', {life: 1000, position: 'bottom-left'});
                return;
            }

            if (!window.confirm("确认删除?")) {
                return;
            }
            $.post("/blog/editblog/deleteBlog", {
                id: id
            }, function (data) {
                if (data.error) {
                    $.jGrowl(data.error, {life: 1000, position: 'bottom-left'});
                } else {
                    $.jGrowl("删除成功", {life: 1000, position: 'bottom-left'});
                    window.location.reload();
                }
            });
        });
    });
});