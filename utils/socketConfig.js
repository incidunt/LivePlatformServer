/**
 * Created by qq1440214507 on 2017/6/16.
 */
module.exports={
    //移动端提交给服务器的字段
    connection:"connection",//连接
    disConnection:"disconnect",//连接
    exit:"exit",//断开连接
    //公用字段
    authMessage:"auth",//认证信息,登陆
    textMessage:"text",//文字消息
    //服务器发送给移动端的字段
    userJoin:"userJoin",//有人加入
    userLeave:"userLeave",//有人离开
}
