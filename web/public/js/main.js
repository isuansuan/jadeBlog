require.config({
    paths: {
        "jquery": ["lib/jquery/jquery3.1.1"],
        "bootstrap": ["lib/bootstrap/js/bootstrap.min"],
        "lodash": ["lib/lodash-4.17.2/lodash"]
    }
});

require(['jquery', 'lodash'], function ($, _) {

    $(document).ready(function () {
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
    });

});

