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
const sqlHelper = require('../utils/dbHelper')
//const bodyParser = require('koa-bodyparser')
const app = new Koa()
//app.use(bodyParser())
router.get("/123",async (ctx)=>{
    let time = await sqlHelper.query("select * from user where account = ? and password = ?",[13579071101,12345678])
    ctx.body=time
 })
app.use(router.routes())
app.listen(3003)
