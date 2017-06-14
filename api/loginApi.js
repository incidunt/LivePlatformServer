/**
 * Created by qq1440214507 on 2017/6/14.
 * 用户登陆
 */
const sqlHelper = require('../utils/dbHelper')
const resultUtil = require('../utils/resultUtil')
const sql = require('../utils/sqlConfig')
const jstUtils = require('../utils/jstUtils')
const login = async(ctx) => {
    const body = ctx.request.body
    if (!body || !body.account || !body.password) {
        ctx.body = resultUtil(null, "用户名或密码为空")
    } else {
        const result = await sqlHelper.query(sql.selectUser, [body.account, body.password])
        if (result.datas) {
            result.datas = await jstUtils.sign(result.datas)
        }
        ctx.body = result
    }

}
module.exports = {
    "POST /login":login,
}
