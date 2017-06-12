/**
 * Created by qq1440214507 on 2017/6/12.
 * 平台操作api
 */
const sql =require('../utils/sqlConfig')
const sqlHelper =require('../utils/dbHelper')
const getPlatform = async (ctx)=>{
    ctx.body=await sqlHelper.query(sql.queryPlatform)
}
module.exports={
    "GET /platform":getPlatform,
}