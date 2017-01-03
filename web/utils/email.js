var nodemailer = require("nodemailer");
var smtpTransport = require('nodemailer-smtp-transport');

// 开启一个 SMTP 连接池  
var transport = nodemailer.createTransport(smtpTransport({
    service: 'QQ',
    host: "smtp.qq.com", // 主机  
    secure: true, // 使用 SSL  
    port: 465, // SMTP 端口  
    auth: {
        user: "2538698032@qq.com", // 账号  
        pass: "***********" // 密码
    }
}));

// 设置邮件内容  
var mailOptions = {
    from: "郑金玮的博客 <2538698032@qq.com>", // 发件地址  
    to: "2538698032@qq.com", // 收件列表  
    subject: "Hello world", // 标题  
    html: "<b>thanks a for visiting!</b> 世界，你好！", // html 内容  
    attachments: [
        {
            filename: 'text0.txt',
            content: 'hello world,file content'
        },
        {
            filename: 'text1.txt',
            path: './test.js'
        }
    ]
};

// 发送邮件
function sendEmail(to, text, subject, callback) {
    mailOptions.to = to;
    mailOptions.subject = subject || "郑金玮的博客   找回密码";
    mailOptions.attachments = [];
    mailOptions.html = text;
    transport.sendMail(mailOptions, function (error, response) {
        transport.close(); // 如果没用，关闭连接池  
        callback(error, response);
    });
}

module.exports = {
    send: sendEmail
};