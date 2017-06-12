/**
 * Created by qq1440214507 on 2017/6/12.
 */
const isEmpty = (obj)=>{
    for (let key in obj){
        return false
    }
    return true
}
const updateObject =(sqlData,putData)=>{
    for(let key in putData){
        if(sqlData.hasOwnProperty(key)){
            sqlData[key]=putData[key]
        }

    }
}
module.exports={
    isEmpty:isEmpty,
    updateObject:updateObject
}