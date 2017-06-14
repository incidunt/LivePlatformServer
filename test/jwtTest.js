/**
 * Created by qq1440214507 on 2017/6/13.
 */
// sign with default (HMAC SHA256)
var jwt = require('../utils/jstUtils');
const token = jwt.sign({aa:"haha"})
console.log(token)
const datas =async ()=>{
  const data= await jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTk5OTg2NzUsImRhdGEiOnsiYWEiOiJoYWhhIn0sImlhdCI6MTQ5NzQwNjY3NX0.d7QMSWgbPw5ONHKyf-08bMblu3nav1WbfJtF4PBev2U')
   if (data==""){
      console.log('不合法')
   }
   console.log(data)
}

datas()