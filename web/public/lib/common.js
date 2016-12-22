/**
 * Created by ff on 2016/12/22.
 */
/**
 * 判断是否是 正确的邮箱
 * @param str
 */
function isEmail(email) {
    var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    return emailReg.test(email);
}
