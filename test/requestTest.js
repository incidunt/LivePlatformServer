/**
 * Created by qq1440214507 on 2017/6/12.
 */
const  request = require("request")
request({
    url: "http://localhost:3001/login",
    method: "POST",
    json: true,
    headers: {"content-type": "application/json"},
    body: {token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0OTc0MDcwMjEsImRhdGEiOnsiYWEiOiJoYWhhIn0sImlhdCI6MTQ5NzQwNzAyMH0.e6ZeQQXSE-Cufl4nRDp4meVZRLgFXfOtsNpg7GG6QrE",

               phone:13579071101,
               account:13579071101,
               password:"12345678",
               nickname:"hahahaah"

    }
}, function (error, response, body) {
    console.log(body,new Date().getTime())

});