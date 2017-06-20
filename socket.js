const server = require('http').createServer();
const io = require('socket.io')(server);
const socketEvent = require('./utils/socketConfig')
const resultUtil = require('./utils/resultUtil')
const jstUtils = require('./utils/jstUtils')
const roomManager = require('./utils/roomManager')
//连接时请附带登陆token
io.on(socketEvent.connection,async (socket)=>{
    console.log(socket.id,'连接')
    const query = socket.handshake.query;
    //join 加入一定要在这个位置执行，如果在登陆位置执行可能导致断线重连之后，移动端没有调用再登陆方法，将导致无法进行聊天
    socket.join(query.anchorId.toString())
   // roomManager.joinSocketId(query.anchorId,)
    socket.on(socketEvent.authMessage,async data=>{
        const query = JSON.parse(data);
        if (query.token) {
            //这里只包含的用户id和用户账户信息
            const user = await jstUtils.verify(query.token)
            if (user) {
                //一切正确将用户信息加入
                const anchorId = query.anchorId.toString()
                roomManager.join(anchorId,user.id)
                socket.to(anchorId).emit(socketEvent.userJoin,{id:user.id,nickname:user.nickname})
                socket.emit(socketEvent.authMessage,{code:1,message:"连接成功"})
                //登陆信息失效
                console.log(socket.id,'登陆')
            } else {
                socket.emit(socketEvent.authMessage, resultUtil(null, "登陆信息失效，请重新登陆"))
            }
        } else {
            socket.emit(socketEvent.authMessage, resultUtil(null, "未接收到认证或者主播相关相关信息"))
        }
    })

    socket.on(socketEvent.textMessage, async data => {
        console.log(socket.id,'发送')
        const query = socket.handshake.query;
        //socket.to(query.anchorId.toString()).emit(socketEvent.textMessage,{id:"你大爷的id"})
        socket.broadcast.to(query.anchorId.toString()).emit(socketEvent.textMessage, {id:"你大爷的id"});
    });
    socket.on(socketEvent.exit,async ()=>{
        console.log(socket.id,'退出')
        const query = socket.handshake.query;
        const user = await jstUtils.verify(query.token)
        socket.to(query.anchorId.toString()).emit(socketEvent.userLeave,{id:user.id,nickname:user.nickname})
        roomManager.exit(query.anchorId.toString(),user.id)
    })
   socket.on(socketEvent.disConnection,async () => {
      //这个方法会无缘无故调用，暂时为找到原因，所以自定义退出
       console.log(socket.id,'离开')
       const query = socket.handshake.query;
       socket.leave(query.anchorId.toString())
    });
});


server.listen(8080);