/**
 * Created by qq1440214507 on 2017/6/12.
 */
const http = require('http')
const server =http.createServer((err,req,res)=>{
    console.log(req.body)
    console.log(req)
})
server.listen(3005)