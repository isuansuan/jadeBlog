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
            enName: 'News',
            chName: '最新发布',
            desc: '最新发布的博客'
        },
        {
            enName: 'Node.Js',
            chName: 'Node.Js',
            desc: 'Node.Js相关技术'
        },
        {
            enName: 'Python',
            chName: 'Python',
            desc: 'Python相关技术'
        },
        {
            enName: 'C++',
            chName: 'C++',
            desc: 'C++相关技术'
        },
        {
            enName: 'PHP',
            chName: 'PHP',
            desc: 'PHP相关技术'
        },
        {
            enName: 'CSS/Html',
            chName: 'CSS/Html',
            desc: 'CSS/Html相关技术'
        },
        {
            enName: 'algorithm',
            chName: '数据结构与算法',
            desc: '算法技术'
        },
        {
            enName: 'The poem and the distance',
            chName: '诗和远方',
            desc: '生活相关'
        },
        {
            enName: 'Server framework',
            chName: '服务器框架',
            desc: '服务器框架技术'
        }
    ]
};
