!function (n) {
    "use strict";
    function isEmail(email) {
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        return emailReg.test(email);
    }

    "function" == typeof define && define.amd ? define(function () {
        return {
            isEmail: isEmail
        }
    }) : "object" == typeof module && module.exports ? module.exports = {
        isEmail: isEmail
    } : n.isEmail = isEmail
}(this);

