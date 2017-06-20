/**
 * Created by qq1440214507 on 2017/6/20.
 * 聊天室管理
 */
//聊天室集合
const rooms=new Map()
//映射socket与 聊天室的关系
const socketIds = new Map()
//加入聊天室
const join=(anchorId,userId)=>{
    if (!rooms.has(anchorId)){
        const room={}
        room.users=new Set()
        room.users.add(userId)
        rooms.set(anchorId,room)
    }else {
        rooms.get(anchorId).users.add(userId)
    }
}
const exit=(anchorId,userId)=>{
    if (rooms.has(anchorId)){
        const users = rooms.get(anchorId).users;
        users.delete(userId)
    }

}

//socketId 与 聊天的关系
const joinSocketId=(anchorId,socket)=>{
    socketIds.set(socket.id,anchorId)
    socket.join(anchorId)
}
const exitSocketId=(socketId)=>{
    const id = socketIds.get(socketId);
    socketIds.delete(socketId)
    return id
}
const getAnchorId=(socketId)=>{
    return socketIds.get(socketId);
}
module.exports={
    join:join,
    exit:exit

}


