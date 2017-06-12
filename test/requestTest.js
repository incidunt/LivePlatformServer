/**
 * Created by qq1440214507 on 2017/6/12.
 */
const  request = require("request")
request({
    url: "http://localhost:3000/user/1001",
    method: "PUT",
    json: true,
    headers: {"content-type": "application/json"},
    body: {account:12345678}
}, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body)
    }
});