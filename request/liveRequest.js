/**
 * Created by qq1440214507 on 2017/6/8.
 * kk直播 资源获取
 */
const request=require('request')
const liveRequest = (url,options)=>{
    return new Promise((resolve,reject)=>{
        request(url,options,(err,response,body)=>{
            if (err){
                reject(err)
            }else {
                resolve(body)
            }
        })
    })
}
module.exports=liveRequest