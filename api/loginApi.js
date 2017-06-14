/**
 * Created by qq1440214507 on 2017/6/14.
 * 用户登陆
 */
const sqlHelper =require('../utils/dbHelper')
const resultUtil =require('../utils/resultUtil')
const userUtils =require('../utils/userUtils')
const sql =require('../utils/sqlConfig')
const jstUtils =require('../utils/jstUtils')
const login=async (ctx)=>{
    const body = ctx.request.body
    if (!body && !body.account && !body.password){
        ctx.body=resultUtil(null,"用户名或密码为空")
    }else {
        if (!userUtils.isRightPhone(body.account) || !userUtils.isRightPassword(body.password)){
           ctx.body=resultUtil(null,"用户或密码不合法")
        }else {
           const result = await sqlHelper.query(sql.selectUser,[body.account,body.password])
            if (result.datas[0]){//存在数据，开始token
               result.datas=jstUtils.sign(result.datas[0])
            }
            ctx.body=result
        }
    }
}
module.exports={
    "GET /login":login
}
