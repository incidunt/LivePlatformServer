/**
 * Created by qq1440214507 on 2017/5/31.
 * 启动服务
 */
const Koa = require('koa')
const router = require('koa-router')()
const koaStatic = require('koa-static')
const bodyParser = require('koa-bodyparser')
const path = require('path')
const controlRouter = require('./apiControllers')
const tokenUtils = require('./utils/jstUtils')
const app = new Koa()
//静态资源管理
app.use(koaStatic(
    path.join( __dirname,"/static")
))
app.use(bodyParser())
//token验证 除去注册
router.all("/!*",async (ctx,next)=>{
    const token = ctx.request.body.token
    const user=await tokenUtils.verify(token)
    console.log(ctx.request.originalUrl)
    if (!user && ctx.request.originalUrl!="/user" && ctx.request.originalUrl!="/login"){
        ctx.body={code:-2,message:token==""?"token不存在":"token过期"}
    }else {
        ctx.request.body.user=user
        next()
    }
})
//请求链接设置
controlRouter.addControl(router)
//无效链接
router.all("/*",(ctx)=>{
    const result={}
    result.code=404
    result.message="Not Found"
    ctx.body=result
})
app.use(router.routes())
app.use(router.allowedMethods());
app.listen(3001)




