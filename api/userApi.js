/**
 * Created by qq1440214507 on 2017/6/9.
 * 用户操作api
 */
const sql =require('../utils/sqlConfig')
const sqlHelper =require('../utils/dbHelper')
const resultUtil =require('../utils/resultUtil')
const ObjectUtils =require('../utils/objectUtils')
const createUser =async (ctx)=>{
    console.log(ctx.request.body)
    console.log(ctx.request.json)
    console.log(ctx.json)
    ctx.body="创建用户成功"
}
const getUserInfo =async (ctx)=>{
    ctx.body=await sqlHelper.query(sql.queryUserById,ctx.params.id)
}
const updateUserInfo= async ctx=>{
    //请求 方式
    /* url: "http://localhost:3000/user/1001",
     method: "PUT",
     json: true,
     headers: {"content-type": "application/json"},
     body: {account:12345678}*/
    const requestBody=ctx.request.body
    if (ObjectUtils.isEmpty(requestBody)){
        ctx.body=resultUtil(null, "请提交需要修改的数据")
    }else {
        let sqlResult = await sqlHelper.query(sql.queryUserById, ctx.params.id)
        if (sqlResult.code == 0 || sqlResult.code == -1) {//发生错误或者用户不存在返回
            ctx.body = sqlResult
        } else {
            let user = sqlResult.datas[0]
            ObjectUtils.updateObject(user,requestBody)
            let result = await sqlHelper.query(sql.replaceUserSql, user)
            result.datas = []
            ctx.body = result
        }
    }

}

module.exports={
    'POST /user':createUser,
    'GET /user/:id':getUserInfo,
    'PUT /user/:id':updateUserInfo
}
