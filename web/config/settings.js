module.exports = {
    db: {
        mongodb: {
            host: '127.0.0.1',
            port: 27017,
            db: 'mydb',
            auth: null
        },
        redis: {
            host: '127.0.0.1',
            port: 6379,
            db: 'mydb',
            auth: null
        }
    },
    sideBar: [
        {
            en: 'News',
            ch: '最新发布',
            desc: '最新发布的博客'
        },
        {
            en: 'Node.Js',
            ch: 'Node.Js',
            desc: 'Node.Js相关技术'
        },
        {
            en: 'Python',
            ch: 'Python',
            desc: 'Python相关技术'
        },
        {
            en: 'C++',
            ch: 'C++',
            desc: 'C++相关技术'
        },
        {
            en: 'PHP',
            ch: 'PHP',
            desc: 'PHP相关技术'
        },
        {
            en: 'CSS/Html',
            ch: 'CSS/Html',
            desc: 'CSS/Html相关技术'
        },
        {
            en: 'algorithm',
            ch: '数据结构与算法',
            desc: '算法技术'
        },
        {
            en: 'The poem and the distance',
            ch: '诗和远方',
            desc: '生活相关'
        },
        {
            en: 'Server framework',
            ch: '服务器框架',
            desc: '服务器框架技术'
        }
    ],
    mainPage: {
        welcome: {
            head: {
                en: 'Welcome',
                ch: '欢迎'
            },
            en: "Thank you for access my private blog,hope can help you,This blog is developed for Increase the knowledge surface,good luck!",
            ch: "感谢您访问我的私人博客,希望能帮助到你，祝你好运!"
        },
        childPage: [
            {en: "CSDN Blog Link", ch: "CSDN 博客链接", link: "http://my.csdn.net/dai_jing"},
            {en: "GitHub Project", ch: "GitHub 工程", link: "https://github.com/zhengjinwei123"}
        ]
    }
};
