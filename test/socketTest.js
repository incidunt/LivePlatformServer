const server = require('http').createServer();
const io = require('socket.io')(server);
const socketEvent = require('../utils/socketConfig')
const resultUtil = require('../utils/resultUtil')
const jstUtils = require('../utils/jstUtils')
const sockets = new Map()//存放主播 与 用户 映射关系
//  这里可能需要重新学习一下 官网api
//连接时请附带登陆token
io.on(socketEvent.connection, function (client) {
    //连接上将用户加入集合 先验证用户是否登陆过
    const query = client.handshake.query
    //如何未经过验证 或者 没有上传主播平台id 返回错误信息
    if (query.token && query.anchorId) {
        //这里只包含的用户id和用户账户信息
        const user = jstUtils.verify(query.token)
        if (user) {
            //初始化
            if (!sockets[query.anchorId]) {
                sockets[query.anchorId] = new Set()
            }
            client.userInfo = user
            //一切正确将用户信息加入
            sockets[query.anchorId].add(client)
            console.log(sockets[query.anchorId].size)
           //client.emit("replyText",{code:1,message:"连接成功"})
            //登陆信息失效
        } else {
            client.emit(socketEvent.authMessage, resultUtil(null, "登陆信息失效，请重新登陆"))
        }
    } else {
        client.emit(socketEvent.authMessage, resultUtil(null, "为接收到认证或者主播相关相关信息"))
    }

    //console.log(sockets)

    client.on(socketEvent.textMessage, data => {
        if (sockets) {
            const anchorId = client.handshake.query.anchorId
            for (let value of sockets[anchorId]) {
                //自己不给自己发
                if (client.id != value.id) {
                    value.emit(socketEvent.textMessage, {
                        code: 1, type: socketEvent.textMessage, datas: {
                            user: client.userInfo,
                            data: data
                        }
                    })
                }
            }
        }
    });
    client.on(socketEvent.disconnect, () => {
        const anchorId = client.handshake.query.anchorId
        if (anchorId && sockets[anchorId].has(client)) {
            sockets[anchorId].delete(client)
            console.log('移除了' + client.id)

        } else {
            console.log("移除对象失败" + client.id)
        }

    });
});

server.listen(8080);