/**
 * Created by qq1440214507 on 2017/6/8.
 * 循环获取三方资源
 */
const urls = require('./liveConfig')
const DbHelper = require('../utils/dbHelper')
const liveRequest = require('./liveRequest')
const sqlConfig = require('../utils/sqlConfig')
let count = 0;
/*setInterval(async ()=>{
 await requestData();
 },urls.loopTime)*/
const requestData = async() => {
    console.log(`第${++count}次发起请求`)
    const body = []
    //kk直播请求
    try {
        const kkBody = await liveRequest(urls.kk.url)
        parseKKBody(body, kkBody)
    } catch (e) {
        console.log("kk直播请求出问题了")
    }
    //制服直播每次返回的数据过少，所以多次请求,循环5次
    try {
        for (let i = 1; i <= 5; i++) {
            const newUrl = urls.zf.url.replace("page=1", `page=${i}`)

            const zfBody = await liveRequest(newUrl, {method: 'GET'})
            parseZF(body, zfBody)
        }
    } catch (e) {
        console.log("制服直播出问题了")
    }
    try {
        //抱抱直播
        const bbBody = await liveRequest(urls.bb.url)
        parseBB(body, bbBody)
    } catch (e) {
        console.log("抱抱直播出问题了")
    }
    try {
        //17玩直播
        const yqBody = await liveRequest(urls.yq.url)
        parseYQ(body, yqBody)
    } catch (e) {
        console.log(" 17玩直播出问题了")
    }
    try {
        //九秀直播
        for (let i = 0; i < 5; i++) {
            const url = urls.jx.url.replace("page=0",`page=${i}`)
            const jxBody = await liveRequest(url)
            parseJX(body, jxBody)
        }
    } catch (e) {
        console.log("九秀直播出问题了")
    }
    //优艺直播---没有声音 暂时没有找到原因
    //const yyBody = await liveRequest(urls.yy.url,{method: 'POST',form:urls.yy.postJson})
    //parseYY(body,yyBody)
    /*try {
     //冰棍直播 这个直播连接已经失效
     const bgBody = await liveRequest(urls.bg.url)
     parseBGBody(body, bgBody)
     } catch (e) {
     console.log("冰棍直播出问题了")
     }*/
    DbHelper.insertAll(sqlConfig.replaceAnchorSql, body)
}
requestData();
//kk直播
const parseKKBody = (body, parseBody) => {
    const roomLists = JSON.parse(parseBody).roomList
    const length = roomLists.length
    for (let i = 0; i < length; i++) {
        const room = {}
        room.roomId = roomLists[i].roomId
        room.liveStream = roomLists[i].liveStream
        room.anchorId = `${urls.kk.platform}${roomLists[i].userId}`
        room.onlineCount = roomLists[i].onlineCount
        room.nickname = roomLists[i].nickname
        // room.livestarttime=roomLists[i].livestarttime
        room.city = roomLists[i].city
        room.userId = roomLists[i].userId
        room.platform = urls.kk.platform
        room.updateTime = new Date().getTime()
        room.userIcon = urls.kk.imageUrl + roomLists[i].portrait_path_original
        room.gender = roomLists[i].gender
        /*0女 1 男*/
        room.roomImage = urls.kk.imageUrl + roomLists[i].poster_path_original
        room.roomTitle = `${roomLists[i].nickname}的直播间`
        body.push(room)
    }
}
//冰棍直播
const parseBGBody = (body, parseBody) => {
    const datas = JSON.parse(parseBody)
    if (datas.ret != 200) {
        return
    }
    const roomLists = datas.data.info
    const length = roomLists.length
    for (let i = 0; i < length; i++) {
        const room = {}
        //冰棍直播没有roomId，定为主播id
        room.roomId = roomLists[i].uid
        room.liveStream = roomLists[i].pull
        room.anchorId = `${urls.bg.platform}${roomLists[i].uid}`
        room.onlineCount = roomLists[i].nums
        room.nickname = roomLists[i].user_nicename
        // room.livestarttime=roomLists[i].livestarttime
        room.city = roomLists[i].city
        room.userId = roomLists[i].uid
        room.platform = urls.bg.platform
        room.updateTime = new Date().getTime()
        room.userIcon = roomLists[i].avatar
        room.gender = 0
        /*0女 1 男*/
        room.roomImage = roomLists[i].avatar_thumb
        room.roomTitle = roomLists[i].title || `${roomLists[i].user_nicename}的直播间`
        body.push(room)
    }
}
//17玩直播
const parseYQ = (body, parseBody) => {
    const json = JSON.parse(parseBody)
    if (json.ErrCode != 0) {
        console.log("17玩直播请求出错了")
        return
    }
    const roomLists = json.PlayBackList
    const length = roomLists.length
    for (let i = 0; i < length; i++) {
        const room = {}
        const obj = roomLists[i]
        room.roomId = obj.room_id
        room.liveStream = obj.live_url
        const id = obj.owner_id
        room.anchorId = `${urls.yq.platform}${id}`
        room.onlineCount = obj.viewer
        room.nickname = obj.nick_name
        room.city = obj.location
        room.userId = id
        room.platform = urls.yq.platform
        room.updateTime = new Date().getTime()
        room.userIcon = obj.image
        //下面这个字段尚不确定这个接口需要重新获取 ，暂时只为女
        room.gender = obj.sex == 1 ? 0 : 1
        /*0女 1 男*/
        room.roomTitle = obj.room_name
        room.roomImage = obj.cover
        body.push(room)
    }
}
//抱抱直播
const parseBB = (body, parseBody) => {
    const json = JSON.parse(parseBody)
    if (json.error.errno != 200) {
        console.log("抱抱直播请求出错了")
        return
    }
    const roomLists = json.roomList.room
    const length = roomLists.length
    for (let i = 0; i < length; i++) {
        const room = {}
        const obj = roomLists[i]
        room.roomId = obj.zId
        room.liveStream = obj.subUrl[0].url
        const id = obj.zId
        room.anchorId = `${urls.bb.platform}${id}`
        room.onlineCount = obj.liveNum
        room.nickname = obj.user.userBase.nickName
        room.city = obj.user.userBase.position
        room.userId = id
        room.platform = urls.bb.platform
        room.updateTime = new Date().getTime()
        room.userIcon = obj.user.userBase.portraitUrl
        //下面这个字段尚不确定这个接口需要重新获取 ，暂时只为女
        room.gender = obj.user.userBase.sex == 2 ? 0 : 1
        /*0女 1 男*/
        room.roomTitle = obj.user.userBase.stag
        room.roomImage = obj.picUrl
        body.push(room)
    }

}
//九秀直播
const parseJX = (body, parseBody) => {
    const json = JSON.parse(parseBody)
    if (json.code != 200) {
        console.log("九秀直播请求出错了")
        return
    }
    const roomLists = json.data
    const length = roomLists.length
    for (let i = 0; i < length; i++) {
        const room = {}
        const obj = roomLists[i]
        room.roomId = obj.rid
        room.liveStream = obj.video_domain
        const id = obj.uid
        room.anchorId = `${urls.jx.platform}${id}`
        room.onlineCount = obj.usercount
        room.nickname = obj.nickname
        room.city = obj.city
        room.userId = id
        room.platform = urls.jx.platform
        room.updateTime = new Date().getTime()
        room.userIcon = obj.phonehallposter
        //下面这个字段尚不确定这个接口需要重新获取 ，暂时只为女
        room.gender = 0
        /*0女 1 男*/
        room.roomTitle = obj.nickname + "的直播间"
        room.roomImage = obj.phonehallposter
        body.push(room)
    }

}
//制服直播
const parseZF = (body, parseBody) => {
    const json = JSON.parse(parseBody)
    if (json.code != 1) {
        console.log("制服直播请求出错了")
        return
    }
    const roomLists = json.info
    const length = roomLists.length
    for (let i = 0; i < length; i++) {
        const room = {}
        const obj = roomLists[i]
        room.roomId = obj.roomid
        room.liveStream = obj.url
        const id = obj.userInfo.user_id
        room.anchorId = `${urls.zf.platform}${id}`
        room.onlineCount = obj.aud
        room.nickname = obj.userInfo.nick_nm
        // room.livestarttime=roomLists[i].livestarttime
        room.city = obj.pos
        room.userId = obj.id
        room.platform = urls.zf.platform
        room.updateTime = new Date().getTime()
        room.userIcon = `${urls.zf.imageUrl}${id}_${obj.phid}_720*720.jpg`
        //下面这个字段尚不确定这个接口需要重新获取 ，暂时只为女
        room.gender = 0
        /*0女 1 男*/
        room.roomTitle = obj.title
        room.roomImage = room.userIcon
        body.push(room)
    }

}
//优艺
const parseYY = (body, parseBody) => {
    const json = JSON.parse(parseBody)
    if (json.result != 1) {
        console.log("优艺直播请求出错了")
        return
    }
    const roomLists = json.list
    const length = roomLists.length
    for (let i = 0; i < length; i++) {
        const room = {}
        const obj = roomLists[i]
        room.roomId = obj.roomid
        room.liveStream = obj.roomVedioLink
        const id = obj.userid
        room.anchorId = `${urls.yy.platform}${id}`
        room.onlineCount = obj.count
        room.nickname = obj.username
        // room.livestarttime=roomLists[i].livestarttime
        room.city = obj.address
        room.userId = id
        room.platform = urls.yy.platform
        room.updateTime = new Date().getTime()
        room.userIcon = obj.userimage
        //下面这个字段尚不确定这个接口需要重新获取 ，暂时只为女
        room.gender = 0
        /*0女 1 男*/
        room.roomTitle = obj.s_title
        room.roomImage = obj.roomimage
        body.push(room)
    }

}


//dbUtils.insert(room)