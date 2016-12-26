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
    user: {
        use: true,
        username: "zhengjinwei",
        password: "BL123456",
        email: "2538698032@qq.com"
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
            en: 'Cpp',
            ch: 'C++',
            desc: 'C++相关技术'
        },
        {
            en: 'php',
            ch: 'php',
            desc: 'PHP相关技术'
        },
        {
            en: 'Css/Html',
            ch: 'Css/Html',
            desc: 'CSS/Html相关技术'
        },
        {
            en: 'algorithm',
            ch: '数据结构与算法',
            desc: '算法技术'
        },
        {
            en: 'lives',
            ch: '诗和远方',
            desc: '生活相关'
        },
        {
            en: 'serverFramework',
            ch: '服务器框架',
            desc: '服务器框架技术'
        }
    ],
    mainPage: {
        childPage: [
            {en: "CSDN Blog Link", ch: "CSDN 博客链接", link: "http://my.csdn.net/dai_jing"},
            {en: "GitHub Project", ch: "GitHub 工程", link: "https://github.com/zhengjinwei123"}
        ]
    }
};
