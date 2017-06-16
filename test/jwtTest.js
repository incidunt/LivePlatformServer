/**
 * Created by qq1440214507 on 2017/6/13.
 */
// sign with default (HMAC SHA256)
var jwt = require('../utils/jstUtils');
const token = jwt.sign({id:21323123,account:"qq1440214507",nickname:"我叫什么"})
console.log(token)
const datas =async ()=>{
  const data= await jwt.verify('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MDAxOTY1MzEsImRhdGEiOnsiaWQiOjIxMzIzMTIzLCJhY2NvdW50IjoicXExNDQwMjE0NTA3Iiwibmlja25hbWUiOiLmiJHlj6vku4DkuYgifSwiaWF0IjoxNDk3NjA0NTMxfQ.Z6fGWc44NMzBXqnyRKi4coq7mj0jVj93miQGLSUzziI')
   if (data==""){
      console.log('不合法')
   }
   console.log(data)
}

datas()