/**
 * Created by Administrator on 2017/9/25.
 */
var express=require("express");
var router=express.Router();
var mysql=require("mysql");
var DBconfig=require("../config/DBconfig.js");
var sql=require("../module/sql.js");
var jwt=require("jwt-simple");

//获取专题目录
router.post("/category/:cate",function(req,res){
    console.log("name的值为:"+req.body.name);
    var responseDate={};
    //证明该请求是来自简书的
    if(req.body.name=="jianshu")
    {
        console.log("params:"+req.params.cate);
        //获取主页的部分专题信息
        if(req.params.cate=='theme')
        {
            var pool=mysql.createPool(DBconfig.mysql);
            pool.getConnection(function(err,conn){
                if(err){console.log("数据库连接失败:"+err);return false;}
                conn.query(sql.getArticalTheme,function(err,result){
                    if(err){console.log("查询语句出错:"+err);return false;}
                    if(result[0])
                    {
                        //console.log(JSON.stringify(result));
                        responseDate.status=0;
                        responseDate.code=result;
                    }
                    else
                    {
                        console.log("没有查到:"+result);
                        responseDate.status=1;
                    }
                    res.json(responseDate);
                    conn.release();
                });
            });
        }

        //获取theme页面的所有专题信息
        if(req.params.cate=='allTheme')
        {
            console.log("进入到");
            var pool=mysql.createPool(DBconfig.mysql);
            pool.getConnection(function(err,conn){
                if(err){console.log("数据库连接失败:"+err);return false;}
                conn.query(sql.getArticalAllTheme,function(err,result){
                    if(err){console.log("查询语句出错:"+err);return false;}
                    if(result[0])
                    {
                       // console.log(JSON.stringify(result));
                        responseDate.status=0;
                        responseDate.code=result;
                    }
                    else
                    {
                        console.log("没有查到:"+result);
                        responseDate.status=1;
                    }
                    res.json(responseDate);
                    conn.release();
                });
            });
        }
    }

});

//保存文章
router.post("/uploadartical",function(req,res){
    //console.log(JSON.stringify(req.body));
    console.log("进入到保存文章");
    var responseDate={};
    // console.log(req.body);
    if(req.body.name=="jianshu" && req.body.size && req.body.token && req.body.artical && req.body.title && req.body.category)
    {
        // console.log("a");
        var token=req.body.token;
        var title=req.body.title.trim();
        var artical=req.body.artical;
        var category=req.body.category;
        var size=req.body.size;
        if(title.length>100)
        {
            console.log(" 标题太长");
            return false;
        }
        if(artical.length>30000)
        {
            console.log("文章太长了");
            return false;
        }
        var reg=/\d{1,2}/g;
        if(!reg.test(category))
        {
            console.log("文章类型错误");
            return false;
        }
        // console.log("b");
        var pool=mysql.createPool(DBconfig.mysql);
        pool.getConnection(function(err,conn){
            if(err){console.log("数据库连接失败:"+err);return false;}


            var tel=jwt.decode(token,"jianshu");
            console.log(tel);
            var arr=tel.split(".");
            tel=arr[0];
            console.log("解析出来的号码为:"+tel);
            conn.query(sql.getToken,[tel],function(err,result){
                if(err){console.log("查询语句连接出错:"+err);return false;}
                console.log("结果为:"+JSON.stringify(result));
                if(result.length<=0) return false;
                if(result[0].token)
                {
                    if(result[0].token==token)
                    {
                        var userId=result[0].userid;
                        var d = new Date();
                        var time = d.getFullYear() + "-" +(d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                        //title,content,user_id,created_at,category_id
                        conn.query(sql.saveArtical,[title,artical,userId,time,category,size],function(err,result){
                                if(err){console.log("查询语句出错:"+err);return false;}
                                if(result)
                                {
                                    console.log("保存成功");
                                    responseDate.status=0;
                                }
                                else
                                {
                                    responseDate.status=1;
                                    console.log("保存文章失败");
                                }
                                res.json(responseDate);
                        });
                    }
                    else
                    {
                        console.log("数据库:"+result[0].token);
                        console.log("生成的:"+token);
                        responseDate.status=6;//帐号在别的地方登录
                        console.log("异地登录");
                        res.json(responseDate);
                    }
                }
                else
                {
                    console.log(JSON.stringify(result));
                    res.json({"a":JSON.stringify(result)});
                }

            });
        })
    }
    else
    {
        res.json({"code":"内容为空"});
    }
});

//获取文章的详细信息
router.post("/getArticalDetail",function(req,res){
    console.log("进入到getArticaldetail页面");
    if(req.body.name=="jianshu" && req.body.page)
    {
        var responseDate={};
        var page=req.body.page;
        var pool=mysql.createPool(DBconfig.mysql);
        pool.getConnection(function(err,conn){
            if(err){console.log("数据库连接失败:"+err);return false;}
            conn.query(sql.getArticalDetail,[page],function(err,result){
                console.log("artical");
                if(err){console.log("数据库查询语句出错:"+err); return false;}
                if(result[0])
                {
                    responseDate.code=result;
                    responseDate.status=0;
                    //console.log(JSON.stringify(result));
                }
                else
                {
                    responseDate.status=1;
                    console.log("没查询到数据");
                }
                res.json(responseDate);
                conn.release();
            });
        })

    }
});

//获取推荐的作者
router.post("/getRecommendAuthor",function(req,res){
    var responseDate={};
   if(req.body.name=="jianshu" && req.body.page)
   {
       console.log("进入到getRecommendAuthor");
       var page=parseInt(req.body.page);
       var pool=mysql.createPool(DBconfig.mysql);
       pool.getConnection(function(err,conn){
           if(err){console.log("数据库连接失败:"+err);return false;}
           conn.query(sql.recommendAuthor,[page],function(err,result){
               if(err){console.log("查询语句出错:"+err); return false;}
               if(result[0])
               {
                   responseDate.status=0;
                   responseDate.code=result;
                   console.log(JSON.stringify(result));
               }
               else{
                   responseDate.status=1;//没获取到数据
               }
               res.json(responseDate);
           });
       })
   }
});

//获取单个文章的一些信息
router.post("/getSingleArtical",function(req,res) {
    console.log("进入到:getSingleArtical");
    var responseDate = {};
    if (req.body.name == 'jianshu' && req.body.id)
    {
        var id = parseInt(req.body.id);
        var pool = mysql.createPool(DBconfig.mysql);
        pool.getConnection(function (err, conn) {
            if (err) {
                console.log("数据库连接失败:" + err);
                return false;
            }
            conn.query(sql.getSingleArtical, [id], function (err, result) {
                console.log("artical");
                if (err) {
                    console.log("数据库查询语句出错:" + err);
                    return false;
                }
                if (result[0]) {
                    responseDate.code = result;
                    responseDate.status = 0;
                    //console.log(JSON.stringify(result));
                }
                else {
                    responseDate.status = 1;
                    console.log("没查询到数据");
                }
                res.json(responseDate);
                conn.release();
            });
        })
    }
    else
    {
        console.log("Kong");
        responseDate.status=1;
        res.json(responseDate);
    }
});

//保存评论
router.post("/sendComment",function(req,res){
    console.log("sengComent");
    var responseDate={};
    if(req.body.token && req.body.name=="jianshu" && req.body.id && req.body.content)
    {
        var token=req.body.token;
        var articalId=parseInt(req.body.id);
        var content=req.body.content;
        var reg = /<[^>]*>|<\/[^>]*>/gm;
        content=content.replace(reg,"");
        console.log(content);
        var reg=/^\d{1,6}$/;
        if(!reg.test(articalId))
        {return false;console.log("文章id错误");}
        var pool=mysql.createPool(DBconfig.mysql);
        pool.getConnection(function(err,conn){
            if(err){console.log("数据库连接失败:"+err); return false;}
            var tel=jwt.decode(token,'jianshu');
            var arr=tel.split(".");
            console.log(arr[0]);
            tel=arr[0];
            conn.query(sql.getUserId,[tel],function(err,result){
               if(err){console.log(err);return false;}
               if(result[0])
               {
                   console.log("查询到的用户:"+JSON.stringify(result));
                   var userId=result[0].userid;//要插入到评论表的用户id
                   var d = new Date();
                   var time = d.getFullYear() + "-" +(d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                   //blog_id,user_id,content,commented_at
                   conn.query(sql.saveComment,[articalId,userId,content,time],function(err,result){
                       if(err){console.log("查询语句出错:"+err);return false;}
                       if(result.insertId)
                       {
                           responseDate.status=0;//保存成功
                           console.log(JSON.stringify(result));
                           console.log("评论成功");
                       }
                       else
                       {
                           responseDate.status=1;//保存失败
                           console.log("保存评论失败");
                       }
                       res.json(responseDate);
                       conn.release();
                   });

               }
               else
               {
                   console.log("没查到要添加评论的用户id");
               }
            });
        });

    }
});

//获取单篇文章中关于作者的一些信息
router.post("/getSingleAuthorInfo",function(req,res){
    console.log("getSingleAuthorInfo");
    var responseDate={};
    if(req.body.name=='jianshu' && req.body.userId)
    {
        var userId=parseInt(req.body.userId);
        var reg=/^\d{1,6}$/g;
        if(!reg.test(userId))
        {
            console.log("用户格式错误");
            return false;
        }
        console.log(userId);
        var pool=mysql.createPool(DBconfig.mysql);
        pool.getConnection(function(err,conn){
            if(err){console.log("数据库连接失败:"+err);return false;}
            conn.query(sql.getSingleArticalUserIfo,[userId],function(err,result){
                if(err){console.log("查询语句出错:"+err);return false;}
                if(result[0])
                {
                    console.log(JSON.stringify(result));
                    responseDate.status=0;
                    responseDate.code=result;
                }
                else
                {
                    responseDate.status=1;
                    responseDate.code=0;
                    console.log("没有站到相关的用户信息");
                }
                res.json(responseDate);

            });
        })


    }
    else
    {console.log("提交的内容为空");responseDate.status=1;res.json(responseDate);}
});
module.exports=router;