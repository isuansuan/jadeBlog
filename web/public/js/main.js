require.config({
    paths: {
        "jquery": ["/lib/jquery/jquery3.1.1"],
        "bootstrap": ["/lib/bootstrap3/js/bootstrap.min"],
        "lodash": ["/lib/lodash-4.17.2/lodash"],
        "md5": ["/lib/md5"],
        "common": ["/lib/common"],
        "summernote": ["/lib/summernote/dist/summernote.min"],
        "codemirror": ["/lib/codemirror5/lib/codemirror"],
        "codemirrorxml": ["codemirror","/lib/codemirror5/mode/xml/xml"],
        "summernotezhcn": ["/lib/summernote/lang/summernote-zh-CN"],
        "summernotekokr": ["/lib/summernote/lang/summernote-ko-KR"],
        "showLoading": ['/lib/jquery/jquery.showLoading.min'],
        "summernoteextemoji":["/lib/summernote-ext-emoji/dist/summernote-ext-emoji-min"],
        "summernoteexthighlight":["/lib/summernote-ext-highlight/src/summernote-ext-highlight"],
        "summernoteImageTitle":["/lib/summernote/plugin/summernote-image-title"],
        "summernoteExtTemplate":["/lib/summernote/plugin/summernote-ext-template"],
        "jgrowl": [
            '/lib/jquery/jquery.jgrowl.min'
        ],
        "jform": [
            '/lib/jquery/jquery.form'
        ],
        "datePicker": [
            '/lib/jquery/My97DatePicker/WdatePicker'
        ],
        "highcharts": [
            '/lib/jquery/highcharts'
        ],
        "bootstrapSelect": [
            '/lib/bootstrap3/bootstrap-select/js/bootstrap-select'
        ]
    },
    shim: {
        'bootstrap': {deps: ['jquery']},
        'codemirror': {deps: ["jquery", "bootstrap"]},
        'codemirrorxml': {deps: ["codemirror"]},
        'summernote': {deps: ['codemirror']},
        'showLoading': {deps: ['jquery']},
        'summernotezhcn':{deps:['summernote']},
        'summernotekokr':{deps:['summernote']},
        'summernoteextemoji':{deps:['summernote']},
        'summernoteexthighlight':{deps:['summernote']},
        'summernoteImageTitle':{deps:['summernote']},
        'summernoteExtTemplate':{deps:['summernote']},
        'jgrowl': {deps: ['jquery']},
        'jform': {deps: ['jquery']},
        'highcharts': {deps: ['jquery']},
        'bootstrapSelect': {deps: ['jquery','bootstrap']}
    }
});

require(['jquery', 'lodash', "md5", "common", "bootstrap"], function ($, _, md5, common, BT) {

    $(document).ready(function () {
        //启用弹出框
        //$("[data-toggle='popover']").popover();

        //$('#myCarousel').carousel({
        //    interval: 1
        //});

        //语言设置
        $("#idLangSet").on("click", function () {
            var lang = $("#idLang").val();
            lang = (lang == 'ch') ? 'en' : 'ch';
            $.get("/user/lang", {lang: lang},
                function (data) {
                    window.location.reload();
                }
            );
        });

        //登录对话框
        $("#idLogin").on('click', function () {
            $('#loginModal').attr('class', 'modal show');
            $(".mask").show();
        });
        $("#idCloseLogin").on('click', function () {
            $('#loginModal').attr('class', 'modal hide');
            $(".mask").hide();
        });

        //注册对话框
        $("#idRegister2").on('click', function () {
            $('#regModal').attr('class', 'modal show');
            $('#loginModal').attr('class', 'modal hide');
            $(".mask").show();
        });
        $("#idRegister").on('click', function () {
            $('#regModal').attr('class', 'modal show');

            $(".mask").show();
        });
        $("#idCloseReg").on('click', function () {
            $('#regModal').attr('class', 'modal hide');
            $(".mask").hide();
        });

        //登录
        $("#idLoginAction").on("click", function () {
            var email = $("#idLogEmail").val();
            var password = $("#idLogPassword").val().trim();

            //var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!common.isEmail(email)) {
                $("#idLogEmail").popover('show');
                return false;
            }

            if (!password.length) {
                $("#idLogPassword").popover('show');
                return false;
            }

            $.post("/user/login", {email: email, password: md5(password)}, function (data) {

                var error = null;
                try {
                    data = JSON.parse(data);
                    if (data.error) {
                        error = data.error;
                    }
                } catch (e) {
                    error = e.message;
                } finally {
                    if (!error) {
                        $('#loginModal').attr('class', 'modal hide');
                        window.location.href = '/index';
                    } else {
                        window.alert(error);
                    }
                }
            });
        });

        //注册
        $("#idRegAction").on("click", function () {
            //用户名
            var username = $("#idRegUserName").val();
            if (!username || username.length < 3 || username.length > 20) {
                $("#idRegUserName").popover('show');
                return false;
            }
            //邮箱
            var email = $("#idRegEmail").val();
            //var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
            if (!common.isEmail(email)) {
                $("#idRegEmail").popover('show');
                return false;
            }

            //密码
            var password = $("#idRegPsw").val().trim();
            if (!password || password.length < 6 || password.length > 20) {
                $("#idRegPsw").popover('show');
                return false;
            }

            $.post("/user/register", {username: username, email: email, password: password}, function (data) {
                var error = null;
                try {
                    data = JSON.parse(data);
                    if (data.error) {
                        error = data.error;
                    }
                } catch (e) {
                    error = e.message;
                } finally {
                    if (!error) {
                        window.alert("注册成功!");
                        $('#regModal').attr('class', 'modal hide');
                        $('#loginModal').attr('class', 'modal show');

                    } else {
                        window.alert(error);
                    }
                }
            })
        });

        $("#idContract").on("click", function () {
            //$(".modal-dialog").css({display:"block"});
            $('#idContractDialog').modal({
                keyboard: true
            })
        });
    });
});

