const isRightPhone = number => {
    const re = /^1\d{10}$/
    if (re.test(number)) {
        return true
    } else {
        return false
    }
}
const isRightNickname = nickname => {
    if (nickname == "" || nickname == undefined) {
        return false
    }
    const re = /^(.){1,12}$/
    if (re.test(nickname)) {
        return true
    } else {
        return false
    }
}
//之后确定加密算法之后再做处理
const isRightPassword = password => {
    return true
}
const isNull = content => {
    return content == null || content == ""
}
const isRightGender = gender => {
    return gender == 0 || gender == 1 || gender == 2
}
const isRightDescription = des => {
    return isNull(des) || des.toString().length < 128
}
const isRightDatetime = time => {
    const re = /^1[0-9]{12}$/
    if (!re.test(time)) {
        return false
    }
    return new Date().getTime() > parseInt(time)
}
const isRightUser = body => {
    const result = {}
    if (isRightPhone(body.phone) && isRightPassword(body.password) && isRightNickname(body.nickname)) {
        if (isNull(body.gender)) {
            body.gender = 2//保密
        } else if (!isRightGender(body.gender)) {
            result.code = -1
            result.message = "性别信息错误"
            return result
        }
        if (!isRightDescription(body.description)) {
            result.code = -1
            result.message = "用户简介过长"
            return result
        }
        if (!isNull(body.birthday) && !isRightDatetime(body.birthday)) {
            result.code = -1
            result.message = "用户生日数据错误"
            return result
        }
        result.code = 1
        result.message = "注册成功"
        return result
    } else {
        result.code = -1
        result.message = "注册失败，注册信息有误"
        return result
    }
}
//date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getMilliseconds()

module.exports = {
    isRightUser:isRightUser,
    isRightPhone:isRightPhone,
    isRightPassword:isRightPassword
}
