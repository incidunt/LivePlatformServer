const server = require('http').createServer();
const io = require('socket.io')(server);
const socketEvent = require('../utils/socketConfig')
const resultUtil = require('../utils/resultUtil')
const jstUtils = require('../utils/jstUtils')
//  这里可能需要重新学习一下 官网api
//连接时请附带登陆token
io.on(socketEvent.connection, (client)=>{
    client.on(socketEvent.authMessage,async data=>{
        const query = JSON.parse(data);
        if (query.token && query.anchorId) {
            //这里只包含的用户id和用户账户信息
            const user = await jstUtils.verify(query.token)
            if (user) {
                //一切正确将用户信息加入
                client.userInfo=user
                client.anchorId=query.anchorId
                console.log(query.anchorId,client.anchorId)
                client.join(query.anchorId)
                client.emit(socketEvent.authMessage,{code:1,message:"连接成功"})
                //登陆信息失效
            } else {
                client.emit(socketEvent.authMessage, resultUtil(null, "登陆信息失效，请重新登陆"))
            }
        } else {
            client.emit(socketEvent.authMessage, resultUtil(null, "未接收到认证或者主播相关相关信息"))
        }
    })

    client.on(socketEvent.textMessage, data => {
        client.to(client.anchorId).emit('text')
    });
    client.on(socketEvent.exit,()=>{
        client.leave(client.anchorId)
    })
   /* client.on("disconnect", () => {
      //这个方法会无缘无故调用，暂时为找到原因，所以自定义退出
    });*/
});


server.listen(8080);