/**
 * Created by qq1440214507 on 2017/6/9.
 * 管理各种查询为空的提示
 */
const sqlConfig = require('./sqlConfig')
const messageEmptyUtils =new Map()
const keys = Object.keys(sqlConfig);
const message={
    replaceAnchorSql:"数据库错误！",
    queryPlatform:"直播平台不存在",
    queryPlatformAnchor:"直播平台不存在或该平台没有主播",
    queryUserById:"该用户不存在",
    replaceUserSql:"用户信息更新失败",
    insertUserSql:"用户已存在",
    selectUser:"用户名或密码错误",
}
for(let key of keys){
    messageEmptyUtils.set(sqlConfig[key],message[key])

}
module.exports=messageEmptyUtils