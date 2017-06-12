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
const app = new Koa()
//静态资源管理
app.use(koaStatic(
    path.join( __dirname,"/static")
))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods());
//请求链接设置
controlRouter.addControl(router)
//无效链接
router.all("/*",(ctx)=>{
    const result={}
    result.code=404
    result.message="Not Found"
    result.datas=[]
    ctx.body=result
})

app.listen(3000)




