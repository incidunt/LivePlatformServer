/**
 * Created by qq1440214507 on 2017/6/13.
 * jst认证
 */
const key = "jcxy@liveplatform"
const jwt = require('jsonwebtoken')
const ObjUtils = require('./objectUtils')
const sign = (obj) => {
    if (ObjUtils.isEmpty(obj)) {
        return ""
    }
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 *30,//过期时间设置为一个月
        data: obj
    }, key);
}
const verify = (token) => {
    return new Promise((res)=>{
        jwt.verify(token,key, function (err, decoded) {
            console.log("验证结果--",decoded)
            if (err) {
                res("")
            } else {
                res(decoded.data)
            }
        });
    })

}
module.exports = {
    sign: sign,
    verify: verify
}
