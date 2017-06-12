/**
 * Created by qq1440214507 on 2017/6/7.
 */
const mysql=require('mysql');
const resultData = require('./resultUtil')
const successMessage = 'success'
const failMessage = 'fail'
const pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    password : '123456',
    database : 'livePlatform',
    charset: "utf8mb4",
    collate: "utf8mb4_unicode_ci",
    port:'3306'
});
const query = (sql,value)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connect)=>{
            if (err){
                reject(err)
            }else {
                connect.query(sql,value,(err,datas)=>{
                    if (err){
                        reject(err)
                    }else {
                        resolve(datas)
                    }
                    connect.release()
                })
            }
        })
    }).then((data)=>{
        return resultData(data,successMessage,sql)
    },(err)=>{
        return resultData(null,`数据库操作出错${err.code}`)
    })
}
//批量插入
const insertAll = (sql,values)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connect)=>{
            if (err){
                reject(err)
            }else {
                const length = values.length
                for (let i=0;i<length;i++){
                    connect.query(sql,values[i],(err)=>{
                        if (err){
                            console.log("插入失败"+err)
                        }
                    })
                }
                resolve()
                connect.release()

            }
        })
    }).then((data)=>{
        return resultData(data,successMessage,sql)
    },(err)=>{
       return resultData(null,`数据库操作出错${err.code}`)
    })
}

module.exports={
    query:query,
    insertAll:insertAll,
    successMessage:successMessage,
    failMessage:failMessage
}