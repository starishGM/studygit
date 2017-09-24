/**
 * Created by Administrator on 2017/9/22.
 */
var sql={
    //注册
    getUserId:"select userid from user where tele=?",
    insertUser:"insert into user(nickname,tele,password,created_at,token) values(?,?,?,?,?)",

    //登录，退出
    getUserInfo:"select password,token from user where tele=?",
    updateToken:"UPDATE user set token=? where tele=?",

    //记住密码登录
    getToken:"select token from user where tele=?",

    //完善信息
    updateInfo:"update user set nickname=?,email=? where tele=?",
    updatePersonInfo:"update user set sex=?,introduce=?,weburl=? where tele=?",
    selectHeader:"select head from user where tele=?",
    insertHead:"update user set head=? where tele=?"

};
module.exports=sql;