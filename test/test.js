/**
 * Created by qq1440214507 on 2017/6/12.
 */
/*
const  fs = require('fs')
fs.readdirSync("/Users/qq1440214507/WebstormProjects/LivePlatform/api").forEach((f)=>{
    console.log(f.toString())
})
console.log(__dirname)*/
const Koa = require('koa')
const router = require('koa-router')()
//const bodyParser = require('koa-bodyparser')
const app = new Koa()
//app.use(bodyParser())
router.put("/123",(ctx)=>{
    console.log(ctx)
    console.log(ctx.request.body)
    console.log(ctx.request.rawBody)
    console.log(ctx.request.rawHeaders)
    console.log(ctx.request.json)
    ctx.body="1234"
})
app.use(router.routes())
app.listen(3003)
