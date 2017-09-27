/**
 * Created by Administrator on 2017/9/22.
 */
var sql={
    //注册
    getUserId:"select userid from user where tele=?",
    insertUser:"insert into user(nickname,tele,password,created_at,token) values(?,?,?,?,?)",

    //登录，退出
    getUserInfo:"select password,token,head from user where tele=?",
    updateToken:"UPDATE user set token=? where tele=?",

    //记住密码登录
    getToken:"select token,head,userid from user where tele=?",

    //完善信息
    updateInfo:"update user set nickname=?,email=? where tele=?",
    updatePersonInfo:"update user set sex=?,introduce=?,weburl=? where tele=?",
    selectHeader:"select head from user where tele=?",
    insertHead:"update user set head=? where tele=?",

    //获取文章专题
    getArticalTheme:"select category_id,categoryname,head from category limit 0,9",
    getArticalAllTheme:"select category_id,categoryname,head,introduce from category",

    //保存文章  blog_id,title,content,user_id,created_at,category_id
    saveArtical:"INSERT INTO blog VALUES ('null',?,?,?,?,?,?)",

    //获取文章细节
    getArticalDetail:"select IF(a.nickname is null,'雷锋',a.nickname) as nickname,a.blog_id as blog_id,a.title as title,a.blo_time as time,a.content as content,a.categoryname as categoryname,IF(a.head is null,'888888.jpg',a.head) as head,a.userid as userid,IF(com_like.com_num is null,0,com_like.com_num) as com_num,IF(com_like.lik_num is null,0,com_like.lik_num) as lik_num from(select blog_id,title,blo_cat.created_at as blo_time,content,categoryname,head,peo.userid as userid,peo.nickname as nickname from(select blog_id,title,created_at,content,categoryname,user_id from blog blo join category cat on blo.category_id=cat.category_id) blo_cat join user  peo on blo_cat.user_id=peo.userid) as a left join(select lik.blog_id as blog_id,lik.lik_num,com.com_num from(select count(*) as lik_num,blog_id from jianshu2.like GROUP BY blog_id) lik JOIN(select count(*) as com_num,blog_id from jianshu2.comment GROUP BY blog_id) com on lik.blog_id=com.blog_id) as com_like on a.blog_id=com_like.blog_id order by time desc limit 0,?",

    //推荐作者
    recommendAuthor:"SELECT nickname ,userid,head,sum(size) as size,sum(like_count) as sum_like FROM (SELECT `user`.userid,`user`.head, `user`.nickname,blog.blog_id,blog.size, count(distinct `like`.like_id) as like_count FROM blog LEFT JOIN `like` ON blog.blog_id = `like`.blog_id LEFT JOIN `category` ON blog.category_id = `category`.category_id LEFT JOIN `user` ON blog.user_id = `user`.userid GROUP BY blog.blog_id) p GROUP BY userid order by sum_like desc limit 0,? ",

};
module.exports=sql;