/**
 * Created by qq1440214507 on 2017/6/8.
 * sql配置
 */
module.exports={
    replaceAnchorSql:"replace into anchor set ?",
    queryPlatform:"select * from platform",
    queryPlatformAnchor:"select * from anchor where platform = ?",
    queryUserById:"select * from User where id = ?",
    replaceUserSql:"replace into user set ?",
    insertUserSql:"insert into user set ?",
    selectUser:"select * from user where account = ? and password = ?",
}
