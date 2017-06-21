/**
 * Created by qq1440214507 on 2017/6/12.
 * 主播获取操作
 */
const sql =require('../utils/sqlConfig')
const sqlHelper =require('../utils/dbHelper')
const getAnchorByPlatform =async (ctx)=>{
    ctx.body=await sqlHelper.query(sql.queryPlatformAnchor,ctx.params.platform)
}
module.exports={
    "GET /anchor/platform/:platform":getAnchorByPlatform
}