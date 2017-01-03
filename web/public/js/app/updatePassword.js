define(function (require, exports, module) {
    var $ = require("jquery");
    var _ = require("lodash");
    var BS = require("bootstrap");
    var md5 = require("md5");

    $(document).ready(function () {

        $("#idBtnUpdatePsw").on("click", function () {
            var psw = $("#idNewPsw").val();

            if (!psw || psw.length < 6) {
                window.alert("密码太短");
                return;
            }

            var psaAgain = $("#idNewPswAgain").val();
            if (psw != psaAgain) {
                window.alert("两次填写不一致");
                return;
            }

            var email = $("#idMyEmail").val();
            var token = $("#idMyToken").val();
            
            $.post("/user/updatePsw", {email: email, password: md5(psw), token: token}, function (data) {
                if (data.error) {
                    window.alert(data.error);
                } else {
                    window.alert("修改成功，请登录");
                    window.location.href = "index";
                }
            });

        });
    });
});