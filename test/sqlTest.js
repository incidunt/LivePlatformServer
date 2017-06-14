/**
 * Created by qq1440214507 on 2017/6/14.
 */
const sqlHelper = require('../utils/dbHelper')
var time2 = new Date().getTime();
var date = (new Date());

console.log(date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getMilliseconds())
const inset = async ()=>{
    let time = await sqlHelper.query("select * from user where account = ? and password = ?",[13579071101,12345678])
    console.log(time.datas[0])
}

inset()