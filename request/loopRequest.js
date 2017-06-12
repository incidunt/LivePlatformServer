/**
 * Created by qq1440214507 on 2017/6/8.
 * 循环获取三方资源
 */
const urls = require('./liveConfig')
const DbHelper = require('../utils/dbHelper')
const liveRequest = require('./liveRequest')
const sqlConfig = require('../utils/sqlConfig')
let count = 0;
setInterval(async ()=>{
    console.log(`第${++count}次发起请求`)
    const body=[]
    //kk直播请求
    const kkBody = await liveRequest(urls.kk.url)
    console.log(kkBody)
    parseKKBody(body,kkBody)
    //制服直播每次返回的数据过少，所以多次请求,循环5次
    for(let i=1;i<=5;i++){
        const newUrl = urls.zf.url.replace("page=1",`page=${i}`)
        const zfBody = await liveRequest(newUrl,{ method: 'GET'})
        parseZF(body,zfBody)
    }
    //优艺直播---没有声音 暂时没有找到原因
    //const yyBody = await liveRequest(urls.yy.url,{method: 'POST',form:urls.yy.postJson})
    //parseYY(body,yyBody)

    console.log(body)
    DbHelper.insertAll(sqlConfig.replaceSql,body)

},urls.loopTime)
//kk直播
const parseKKBody = (body,parseBody)=>{
    const roomLists= JSON.parse(parseBody).roomList
    const length = roomLists.length
    for(let i = 0;i<length;i++){
        const room={}
        room.roomId=roomLists[i].roomId
        room.liveStream=roomLists[i].liveStream
        room.anchorId=`${urls.kk.platform}${roomLists[i].userId}`
        room.onlineCount=roomLists[i].onlineCount
        room.nickname=roomLists[i].nickname
        // room.livestarttime=roomLists[i].livestarttime
        room.city=roomLists[i].city
        room.userId=roomLists[i].userId
        room.platform=urls.kk.platform
        room.updateTime=new Date().getTime()
        room.userIcon=urls.kk.imageUrl+roomLists[i].portrait_path_original
        room.gender=roomLists[i].gender/*0女 1 男*/
        room.roomImage=urls.kk.imageUrl+roomLists[i].poster_path_original
        room.roomTitle=`${roomLists[i].nickname}的直播间`
        body.push(room)
    }
}
//制服直播
const parseZF=(body,parseBody)=>{
    const json= JSON.parse(parseBody)
    if (json.code!=1){
        console.log("制服直播请求出错了")
        return
    }
   const roomLists = json.info
    const length = roomLists.length
    for(let i = 0;i<length;i++){
        const room={}
        const obj = roomLists[i]
        room.roomId=obj.roomid
        room.liveStream=obj.url
        const id = obj.userInfo.user_id
        room.anchorId=`${urls.zf.platform}${id}`
        room.onlineCount=obj.aud
        room.nickname=obj.userInfo.nick_nm
        // room.livestarttime=roomLists[i].livestarttime
        room.city=obj.pos
        room.userId=obj.id
        room.platform=urls.zf.platform
        room.updateTime=new Date().getTime()
        room.userIcon=`${urls.zf.imageUrl}${id}_${obj.phid}_720*720.jpg`
        //下面这个字段尚不确定这个接口需要重新获取 ，暂时只为女
        room.gender=0/*0女 1 男*/
        room.roomTitle=obj.title
        room.roomImage=room.userIcon
        body.push(room)
    }

}
//优艺
const parseYY=(body,parseBody)=>{
    const json= JSON.parse(parseBody)
    if (json.result!=1){
        console.log("艺直播请求出错了")
        return
    }
    const roomLists = json.list
    const length = roomLists.length
    for(let i = 0;i<length;i++){
        const room={}
        const obj = roomLists[i]
        room.roomId=obj.roomid
        room.liveStream=obj.roomVedioLink
        const id = obj.userid
        room.anchorId=`${urls.yy.platform}${id}`
        room.onlineCount=obj.count
        room.nickname=obj.username
        // room.livestarttime=roomLists[i].livestarttime
        room.city=obj.address
        room.userId=id
        room.platform=urls.yy.platform
        room.updateTime=new Date().getTime()
        room.userIcon=obj.userimage
        //下面这个字段尚不确定这个接口需要重新获取 ，暂时只为女
        room.gender=0/*0女 1 男*/
        room.roomTitle=obj.s_title
        room.roomImage=obj.roomimage
        body.push(room)
    }

}

//dbUtils.insert(room)