/**
 * Created by qq1440214507 on 2017/6/12.
 */
const Obj = require('../utils/objectUtils')
const a ={
    a:1,
    b:3,
    d:5
}
const b ={
    a:2,
    b:10,
    c:5
}
Obj.updateObject(a,b)
console.log(a)