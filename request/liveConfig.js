/**
 * Created by qq1440214507 on 2017/6/8.
 * 三方资源链接
 */
//KK直播
const kk={
    url:"http://api.kktv1.com:8080/meShow/entrance?parameter={'platform':2,'a':1,'c':70515,'v':96,'FuncTag':55000002,'start':0,'offset':100}",
    platform:2,
    imageUrl:"http://ures.kktv8.com/kktv"
}
//制服直播
const ZF={
    platform:1,
    //post user_id=881175959&token=133eb8c55864b4b96fc57e8e6b50f9c0&reg_mac=5c5b2a71cee5a021e66cb0015fc7897c&uid=89566477%2C
    userInfo:"http://api.live.sinashow.com/userinfo/getuserinfo/info.html",
    //http://img.live.sinashow.com/pic/avatar/88239559_32007_720*720.jpg
    imageUrl:"http://img.live.sinashow.com/pic/avatar/",
    url:"http://app.live.sinashow.com/hot?page=1&qid=28003&reg_mac=5c5b2a71cee5a021e66cb0015fc7897c&token=133eb8c55864b4b96fc57e8e6b50f9c0&user_id=881175959&version=1.8.1&hot_type=1"
}
//优艺直播
const YY={
    platform:3,
    //post method=77HB100216{"userid":"-1","page":"1","type":"1","richeslevel":"-1","age":"-1","address":"-1","talentlevel":"-1","experiencelevel":"-1","channelID":"20001","version":"5.1","platform":"1","key":"a06af86454e846c08edaaff716587954"}b
    url:"http://arpc.uyitv.com/youyiweb/getRoomlListV5.action",
    postJson:"method=77HB100216{'userid':'-1','page':'1','type':'1','richeslevel':'-1','age':'-1','address':'-1','talentlevel':'-1','experiencelevel':'-1','channelID':'20001','version':'5.1','platform':'1','key':'a06af86454e846c08edaaff716587954'}b"
}
//冰棍直播
const BG={
    platform:4,
    url:"http://wonder.sc586.cn/api/public/?service=Home.getNew&lng=%27&lat="
}
//抱抱直播
const BB={
    platform:5,
    url:"http://api.myhug.cn/z/hot"
}
//17玩直播
const YQW={
    platform:6,
    url:"http://shangtv.cn:3003/recommand_list?uid=110000"
}
//九秀直播
const JX={
    platform:7,
    url:"http://api.9xiu.com/channel/main/channelTag?os=1&reqtime=1498097167507&ncode=ACC46657E3FAB7DB8EDBB5723242482B&imei=289df9b86951691bec5d3f5e971bab6f&tag=0&page=0&token=glOt6YADhedEZQIbZPtZWKNqNGib1UXktqQQr7zOl83vKKV9RYx%3Djia%3DIQq0%2FbqmwQoeyJr%3Djia%3DfN96PPZAxMh1EU3r1iWeYQUBRz6YYRNVNXQvXdcjZzrjKvj20Q%3D%3D"
}
module.exports={
    loopTime:30000,//循环一次的时间
    kk:kk,
    zf:ZF,
    yy:YY,
    bg:BG,
    bb:BB,
    yq:YQW,
    jx:JX

}

