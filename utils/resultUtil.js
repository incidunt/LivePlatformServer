/**
 * Created by qq1440214507 on 2017/6/9.
 * message 返回的信息
 * code 返回的状态吗 1成功 0数据为空 -1服务器出错／系统繁忙 -2token失效／未登陆 404 url不存在／违法请求
 * 返回的json格式
 */
const emptyMessage = require('./emptyMessageUtils')
const result = (datas,message,sql)=>{
    const result={}
    result.message=message
    if (datas){
        if (datas.length==0){//数据库不存在数据
            result.code=0
            console.log(emptyMessage)
            const resultMessage = emptyMessage.get(sql)
            result.message=resultMessage||"没有数据了"
        }else {
            result.code=1
        }
        if (datas && datas.length==1){
            result.datas=datas[0]
        }else {
            result.datas = datas
        }
    }else {
        result.code=-1
    }
    return result
}

module.exports=result