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
        $("#idBtnAddArticleType").on("click", function () {
            $('#idAddArticleTypeDialog').modal({
                keyboard: true
            })
        });

        var $summernote = $('#summernote');
        $summernote.summernote({
            codemirror: { // codemirror options
                theme: 'monokai'
            },
            height: "400px",
            width: "1000px",
            lang: 'zh-CN',
            minHeight: null,
            maxHeight: null,
            focus: true,
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
            if (code.length == 0) {
                window.alert("文章内容不能为空");
                return false;
            }
            $.post("/blog/editblog", {
                html: code,
                articleType: articleType,
                articleName: articleName
            }, function (data) {
                if (data.error) {
                    window.alert(data.error);
                } else {
                    window.alert(data.info);
                    $summernote.summernote('destroy');
                    window.location.href = '/blog/index?type=' + articleType;
                }
            });
        });

        //添加文章类型
        $("#BtnArticleTypeAdd").on("click", function () {
            var type = $("#idTextArticleType").val();
            if (type.length == 0) {
                window.alert("内容不能为空");
                return false;
            }
            $.post("/blog/editblog/addNewType", {
                type: type
            }, function (data) {
                if (data.error) {
                    window.alert(data.error);
                } else {
                    var $sel = $("#idArticleTypes");
                    $sel.empty();
                    data.info.forEach(function (t) {
                        var o = "<option value='Value'>" + t + "</option>";
                        $sel.append(o);
                    });

                    window.alert("添加成功");
                }
            });
        });
    });
});