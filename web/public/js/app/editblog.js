define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    var BS = require("bootstrap");
    var summernote = require("summernote");


    function sendFile(file, editor, $editable) {
        $(".note-toolbar.btn-toolbar").append('正在上传图片');
        var filename = false;
        try {
            filename = file['name'];
            //alert(filename);
        } catch (e) {
            filename = false;
        }
        if (!filename) {
            $(".note-alarm").remove();
        }
        //以上防止在图片在编辑器内拖拽引发第二次上传导致的提示错误
        var ext = filename.substr(filename.lastIndexOf("."));
        ext = ext.toUpperCase();
        var timestamp = new Date().getTime();
        var name = timestamp + "_" + $("#summernote").attr('aid') + ext;
        //name是文件名，自己随意定义，aid是我自己增加的属性用于区分文件用户
        var data = new FormData();
        data.append("file", file);
        //data.append("key", name);
        //data.append("token", $("#summernote").attr('token'));

        $.ajax({
            data: data,
            type: "POST",
            url: "/summernote/fileUpload", //图片上传出来的url，返回的是图片上传后的路径，http格式
            dataType: "json",
            contentType: false,
            cache: false,
            processData: false,
            success: function (data) {
                var url = data.url;
                $('#summernote').summernote('editor.insertImage', url);
                $(".note-alarm").html("上传成功,请等待加载");
                setTimeout(function () {
                    $(".note-alarm").remove();
                }, 3000);
            },
            error: function () {
                $(".note-alarm").html("上传失败");
                setTimeout(function () {
                    $(".note-alarm").remove();
                }, 3000);
            }
        });
    }

    $(document).ready(function () {

        var $summernote = $('#summernote');
        $summernote.summernote({
            height: "500px",
            width: "1200px",
            lang: 'zh-CN',
            dialogsInBody: true,
            dialogsFade: true,
            popover: {
                image: [
                    ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                    ['float', ['floatLeft', 'floatRight', 'floatNone']],
                    ['remove', ['removeMedia']]
                ],
                link: [
                    ['link', ['linkDialogShow', 'unlink']]
                ],
                air: [
                    ['color', ['color']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['para', ['ul', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link', 'picture']]
                ]
            },
            callbacks: {
                onImageUpload: function (files, editor, $editable) {
                    sendFile(files[0], editor, $editable);
                }
            }
        });

        $(".ote-editor .modal-dialog").css({display: "none"});
        //$(".modal").attr("aria-hidden","true");
        $(".modal").css({display: "none"});
        // var html = $('#summernote').summernote('code');

        $("#idRetEdit").on("click", function () {
            if (window.confirm("所有内容将清空,确认重置吗？")) {
                $('#summernote').summernote('reset');
            }
        });

        $("#idLockEdit").on("click", function () {
            var $lock = $("#idLockEdit");
            if ($lock.text() == "锁定") {
                $lock.text("解锁");
                $summernote.summernote('disable');
            } else {
                $lock.text("锁定");
                $summernote.summernote('enable');
            }
        });

        //提交文章
        $("#idArticleCommit").on("click", function () {
            var code = $summernote.summernote('code');
            var articleType = $("#idArticleTypes").val();
            var articleName = $("#idArticleName").val();

            if (articleName.length < 3) {
                window.alert("文章名称必须大于3个字符");
                return false;
            }
            $.post("/user/editblog", {
                html: code,
                articleType: articleType,
                articleName: articleName
            }, function (data) {
                window.alert(data);
            });
        });
    });
});