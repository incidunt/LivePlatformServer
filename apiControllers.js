/**
 * Created by qq1440214507 on 2017/6/9.
 * api控制管理
 */
const fs = require('fs')
const getString = "GET "
const putString = "PUT "
const postString = "POST "
const deleteString = "DELETE "
const addMapping = (router,mapping)=>{
    if (!router){
        return
    }
    for(let url in mapping){
        if (!url){
            continue
        }
        if (url.startsWith(getString)){//查询
            const getUrlPath = url.substring(getString.length);
            router.get(getUrlPath,mapping[url])
        }else if (url.startsWith(postString)){//创建操作
            const postUrlPath = url.substring(postString.length);
            router.post(postUrlPath,mapping[url])
        }else if (url.startsWith(putString)){//修改操作
            const putUrlPath = url.substring(putString.length);
            router.put(putUrlPath,mapping[url])
        }else if (url.startsWith(deleteString)){//删除操作
            const deleteUrlPath = url.substring(deleteString.length);
            router.del(deleteUrlPath,mapping[url])

        }else {
            console.log(`invalid URL: ${url}`);
        }
    }
}
//获取所有api,并添加到控制器
const getUrls =(router)=>{
    const dirPath = __dirname+"/api";
    fs.readdirSync(dirPath).filter((f)=>{
        return f.endsWith("Api.js")
    }).forEach((f)=>{
        const filePath = dirPath+"/"+f
        const fileMapping = require(filePath)
        addMapping(router,fileMapping)
    })
}
module.exports ={
   addControl:getUrls
}
