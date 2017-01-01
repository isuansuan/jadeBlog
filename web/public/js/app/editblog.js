define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    var BS = require("bootstrap");
    var codemirror = require("codemirror");
    var summernote = require("summernote");
    var summernoteZHCN = require("summernotezhcn");
    var summernotekokr = require("summernotekokr");
    var codemirrorXml = require("codemirrorxml");
    var summernoteExtEmoji = require("summernote-ext-emoji");
    var summernoteExtHightLight = require("summernoteexthighlight");
    var summernoteImageTitle = require("summernoteImageTitle");
    var summernoteExtTemplate = require("summernoteExtTemplate");
    var googlePrettify = require('googlePrettify');
    var showLoading = require("showLoading");
    var lua = require("googlePrettifyLangLua");
    var go = require("googlePrettifyLangGo");
    var css = require("googlePrettifyLangCss");
    var sql = require("googlePrettifyLangSql");


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
            alert("failed");
            return;
        }
        //以上防止在图片在编辑器内拖拽引发第二次上传导致的提示错误
        var ext = filename.substr(filename.lastIndexOf("."));
        ext = ext.toUpperCase();
        var timestamp = new Date().getTime();
        var name = timestamp + "_" + $(".summernote").attr('aid') + ext;
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
                $('.summernote').summernote('editor.insertImage', url);
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
        $('body').showLoading();

        function myPrettyPrint() {
            prettyPrint();
        }

        $("#idBtnAddArticleType").on("click", function () {
            $('#idAddArticleTypeDialog').modal({
                keyboard: true
            })
        });

        $("#idBtnDelArticleType").on("click", function () {
            $('#idDelArticleTypeDialog').modal({
                keyboard: true
            })
        });

        function changePretty() {
            var arr = $.find("[class*='prettyprinted']");
            // window.alert(arr);
            $.each(arr, function () {
                //遍历时,将每个对象的class按空格分割为数组
                var arrCls = this.className.split(' ');
                //通过过滤函数去掉含有current的类,保留其他的class(如果有的话)
                this.className = $.grep(arrCls, function (n, i) {
                    return n.indexOf('prettyprinted') > 0;
                }, true);

                var newName = "";
                for (var i = 0; i < arrCls.length; i++) {
                    if (arrCls[i] != 'prettyprinted') {
                        newName += arrCls[i];
                        newName += " ";
                    }
                }
                this.className = newName.trim();
            });
        }

        $("#isCloseHighLight").on("click", function () {
            changePretty();
        });
        $("#idCodeHighLight").on("click", function () {
            changePretty();
            myPrettyPrint();
        });

        var HelloButton = function (context) {
            var ui = $.summernote.ui;

            // create button
            var button = ui.button({
                contents: '<i class="fa fa-child"/> javascript',
                tooltip: 'javascript',
                click: function () {
                    // invoke insertText method with 'hello' on editor module.
                    context.invoke('editor.insertText', 'javascript');
                }
            });

            return button.render();   // return button as jquery object
        };

        var $summernote = $('.summernote');


        // load github's emoji list
        $.ajax({
            url: 'https://api.github.com/emojis'
        }).then(function (data) {
            var emojis = Object.keys(data);
            var emojiUrls = data;


            var config = {
                tabSize: 4,
                codemirror: {
                    theme: 'monokai',
                    htmlMode: true,
                    lineNumbers: true,
                    mode: 'text/html'                // lineWrapping:true,
                    // extraKeys: {"Ctrl-Space": "autocomplete"}
                },
                fontNames: ['Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Merriweather'],
                prettifyHtml: true,
                height: 400,
                width: 1000,
                lang: 'zh-CN',
                minHeight: "400px",
                maxHeight: null,
                focus: true,
                dialogsInBody: true,
                dialogsFade: true,
                callbacks: {
                    onImageUpload: function (files, editor, $editable) {
                        sendFile(files[0], editor, $editable);
                    },
                    onInit: function () {
                        $('body').hideLoading();
                        $.jGrowl("summernote编辑器 初始化完成", {life: 1000, position: 'bottom-left'});
                    },
                    onEnter: function () {
                        setTimeout(function () {
                            changePretty();
                            myPrettyPrint();
                        }, 10);
                    },
                    onFocus: function () {
                    },
                    onKeyup: function () {
                        // var markupStr = 'hello world';
                        // $('.summernote').summernote('code', markupStr);
                    },
                    onChange: function (contents, $editable) {
                        // console.log('onChange:', contents, $editable);
                    },
                    onpaste: function (e) {
                        // console.log('Called event paste');
                    },
                    onKeydown: function (e) {

                        // $("pre").each(function(){
                        //     var cls = $(this).attr('class');
                        //     if(cls && cls.indexOf("prettyprinted") >= 0){
                        //         cls = cls.replace("prettyprinted"," ");
                        //
                        //         $.jGrowl(cls, {life: 1000, position: 'bottom-left'});
                        //         if(cls.indexOf('linenums') < 0){
                        //             cls += ' linenums';
                        //         }
                        //         $(this).attr('class',cls);
                        //     }else{
                        //         if(cls.indexOf('linenums') < 0){
                        //             cls += ' linenums';
                        //             $(this).attr('class',cls);
                        //         }
                        //     }
                        // });
                    }
                },
                hintDirection: 'bottom',
                hint: [{
                    search: function (keyword, callback) {
                        callback($.grep(emojis, function (item) {
                            return item.indexOf(keyword) === 0;
                        }));
                    },
                    match: /\B:([\-+\w]+)$/,
                    template: function (item) {
                        var content = emojiUrls[item];
                        return '<img src="' + content + '" width="20" /> :' + item + ':';
                    },
                    content: function (item) {
                        var url = emojiUrls[item];
                        if (url) {
                            return $('<img />').attr('src', url).css('width', 20)[0];
                        }
                        return '';
                    }
                }],
                imageTitle: {
                    specificAltField: true
                },
                popover: {
                    image: [
                        ['imagesize', ['imageSize100', 'imageSize50', 'imageSize25']],
                        ['float', ['floatLeft', 'floatRight', 'floatNone']],
                        ['remove', ['removeMedia']],
                        ['custom', ['imageTitle']]
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
                toolbar: [
                    ['style', ['bold', 'italic', 'underline', 'clear', 'hr', 'strikethrough', 'ul', 'ol', 'superscript', 'subscript']],
                    //['style', ["style"]],
                    ['fontsize', ['fontsize']],
                    //['color', ['color']],
                    //['para', ['ul', 'ol', 'paragraph']],
                    ['height', ['height']],
                    ['table', ['table']], // no table button
                    ['insert', ['template', "picture", "link", "video", 'color', 'style', 'fontname']],
                    ['layout', ['paragraph', 'height', 'fullscreen', 'codeview', "undo", "redo"]],
                    ['help', ['help']], //no help button
                    ['mybutton', ['hello']]
                ],
                buttons: {
                    hello: HelloButton
                },
                template: {
                    path: '/summernoteTpls', // path to your template folder
                    list: [ // list of your template (without the .html extension)
                        'code-js',
                        'code-php',
                        'code-html',
                        'code-css',
                        'code-sql',
                        'code-c',
                        'code-cpp',
                        'code-java',
                        'code-sh',
                        'code-py',
                        'code-xml',
                        'code-lua',
                        'code-go',
                        't1'
                    ]
                },
            };
            //config['toolbar'].push('highlight');
            //config['toolbar'].push(['highlight']);
            $summernote.summernote(config);
        });

        $(".ote-editor .modal-dialog").css({display: "none"});
        //$(".modal").attr("aria-hidden","true");
        $(".modal").css({display: "none"});
        // var html = $('#summernote').summernote('code');

        $("#idRetEdit").on("click", function () {
            if (window.confirm("所有内容将清空,确认重置吗？")) {
                $('.summernote').summernote('reset');
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
            changePretty();
            var code = $summernote.summernote('code');
            var articleType = $("#idArticleTypes").find("option:selected").text();
            var articleName = $("#idArticleName").val();

            if (articleName.length < 3) {
                $.jGrowl("文章名称必须大于3个字符", {life: 1000, position: 'bottom-left'});
                return false;
            }
            if (code.length == 0) {
                $.jGrowl("文章内容不能为空", {life: 1000, position: 'bottom-left'});
                return false;
            }


            $('body').showLoading();

            $.post("/blog/editblog", {
                html: code,
                articleType: articleType,
                articleName: articleName
            }, function (data) {
                if (data.error) {
                    $.jGrowl(data.error, {life: 1000, position: 'bottom-left'});
                } else {
                    $.jGrowl(data.info, {life: 1000, position: 'bottom-left'});
                    $summernote.summernote('destroy');
                    window.location.href = '/blog/index?type=' + articleType;
                }
                $('body').hideLoading();
            });
        });

        //删除文章类型提交拦截
        $("#BtnArticleTypeDel").on("click", function () {
            var articleType = $("#idDelArticleTypes").find("option:selected").text();
            if (articleType == undefined) {
                $.jGrowl(articleType, {life: 1000, position: 'bottom-left'});
                return;
            }
            if (!window.confirm("确认删除？")) {
                return;
            }
            $('body').showLoading();

            $.post("/blog/editblog/deleteBlogType", {
                type: articleType
            }, function (data) {

                if (data.error) {
                    $.jGrowl(data.error, {life: 1000, position: 'bottom-left'});
                } else {
                    var $sel = $("#idArticleTypes");
                    $sel.empty();
                    data.info.forEach(function (t) {
                        var o = "<option value='Value'>" + t + "</option>";
                        $sel.append(o);
                    });

                    var $sel1 = $("#idDelArticleTypes");
                    $sel1.empty();
                    data.info.forEach(function (t) {
                        var o = "<option value='Value'>" + t + "</option>";
                        $sel1.append(o);
                    });

                    $.jGrowl("删除成功", {life: 1000, position: 'bottom-left'});
                }
                $('body').hideLoading();
            });
        });

        //添加文章类型
        $("#BtnArticleTypeAdd").on("click", function () {
            var type = $("#idTextArticleType").val();
            if (type.length == 0) {
                $.jGrowl("内容不能为空", {life: 1000, position: 'bottom-left'});
                return false;
            }
            $.post("/blog/editblog/addNewType", {
                type: type
            }, function (data) {
                if (data.error) {
                    $.jGrowl(data.error, {life: 1000, position: 'bottom-left'});
                } else {
                    var $sel = $("#idArticleTypes");
                    $sel.empty();
                    data.info.forEach(function (t) {
                        var o = "<option value='Value'>" + t + "</option>";
                        $sel.append(o);
                    });

                    $.jGrowl("添加成功", {life: 1000, position: 'bottom-left'});
                }
            });
        });
    });
});