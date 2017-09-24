/**
 * Created by Administrator on 2017/9/21.
 */

//用户注册，登录，信息的修改,完善
var express=require("express");
var router=express.Router();
var mysql=require("mysql");
var crypto=require("crypto");
var DBconfig=require("../config/DBconfig.js");
var sql=require("../module/sql.js");
var jwt=require("jwt-simple");
var fs=require("fs");
var path=require("path");
var multiparty=require("multiparty");
//登录
    router.post("/sign_in",function(req,res){
        console.log("sign_in");
        var responseData={};
        //传过来的字段有telephone,password
        //值可能为空，可能只有一部分,或者字段完全对不上
        if(req.body.telephone && req.body.telephone)
        {
            var telephone= req.body.telephone.trim();
            //console.log(tel);
            var password= req.body.password.trim();
            //console.log(password);
            var reg=/^\d{11}$/g;
            if(!reg.test(telephone))
            {
                responseData.status=1;//电话号码格式错误
                res.json(responseData);
                return false;
            }
            var reg=/^\d{6,16}$/g;
            if(!reg.test(password))
            {
                responseData.status=2;//密码格式错误
                res.json(responseData);
                return false;
            }
            var pool=mysql.createPool(DBconfig.mysql);
            pool.getConnection(function(err,conn){
                if(err){console.log("数据库连接失败:"+err); return false}
                conn.query(sql.getUserInfo,[telephone],function(err,result){
                    if(err){console.log("查询语句出错:"+err); return false;}
                    if(result[0])
                    {
                       // console.log("1:"+result[0]);
                        const hash = crypto.createHash('md5');
                        hash.update(password);
                        var md=hash.digest("hex");

                        var token=jwt.encode(telephone,"jianshu");
                        //console.log("mima:"+password);
                       // console.log(md);

                        if(md==result[0].password)
                        {
                            conn.query(sql.updateToken,[token,telephone],function(err,result){
                                //console.log("返回的结果:"+JSON.stringify(result));
                                if(result){
                                    responseData.status=0;
                                    responseData.token=token;
                                    res.json(responseData);
                                }
                            });
                            conn.release();
                            console.log("密码匹配");
                        }
                        else
                        {
                            responseData.status=4;
                            res.json(responseData);
                        }

                    }
                    else
                    {
                        responseData.status=4;
                        res.json(responseData);
                    }
                });
            });
        }
        else
        {
            responseData.status=5;
            res.json(responseData);//手机号和密码不能为空
        }

    });
//注册
    router.post("/sign_up",function(req,res) {
        console.log("sign_up");
        var responseData={};
        if(req.body.nickname && req.body.telephone && req.body.password && req.body.repassword)
        {
            var tel=req.body.telephone.trim();
            var nick=req.body.nickname.trim();
            var password=req.body.password.trim();
            var repassword=req.body.repassword.trim();
            var reg=/^\d{11}$/g;
            if(!reg.test(tel))
            { responseData.status=1;res.json(responseData);return false;}
            var reg=/^((?=[\x21-\x7e]+)[^A-Za-z0-9])$/;
            if(reg.test(nick))
            {responseData.status=3; res.json(responseData);return false;}
            var reg=/^\w{6,16}$/g;
            if(!reg.test(password))
            {responseData.status=2; res.json(responseData);return false; }
            if(password!=repassword)
            { responseData.status=4;res.json(responseData);return false;}
            //数据过滤完

            var pool=mysql.createPool(DBconfig.mysql);
            pool.getConnection(function(err,conn){
                if(err)
                {console.log(err+"数据库连接失败");return false;}
                conn.query(sql.getUserId,[tel],function(err,result){
                    //console.log(sql.getUserId);
                    if(err){console.log("查询语句出错:"+err);return false;}
                    if(result[0])
                    {
                        //该电话已经注册
                        //console.log("1:"+JSON.stringify(result));
                        responseData.status=6;
                        res.json(responseData);
                        return false;
                    }
                    else
                    {   //没注册
                        //console.log("2:"+result);
                        //insert into user(nickname,tele,password,created_at)
                        var token=jwt.encode(tel,"jianshu");
                        //console.log(token);
                        var d = new Date();
                        var time = d.getFullYear() + "-" +(d.getMonth()+1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();

                        const hash = crypto.createHash('md5');
                        hash.update(password);

                        conn.query(sql.insertUser,[nick,tel,hash.digest('hex'),time,token],function(err,result){
                           // console.log("插入结果:"+JSON.stringify(result));//返回插入的id
                            if(result.insertId)
                            {
                                console.log("token");
                                responseData.status=0;
                                responseData.token=token;
                                res.json(responseData);
                                conn.release();
                            }
                            else
                            {
                                responseData.status=7;
                                res.json(responseData);
                                conn.release();
                            }
                        })
                    }
                });
            });
        }
        else
        {
            responseData.status=5;
            res.json(responseData);
        }
    });
//记住密码登录
    router.post("/login",function(req,res){
        //console.log(req.body.token);
        //console.log("记住密码登录");
        //console.log(JSON.stringify(req.body));
        if(req.body.token)
        {
            var token=req.body.token;
            var pool=mysql.createPool(DBconfig.mysql);
            pool.getConnection(function(err,conn){
                var responseDate={};
                if(err){console.log("数据库连接失败"+err);return false;}
                var tel=jwt.decode(token,"jianshu");
                //console.log("jwt解密后的tel："+tel);
                conn.query(sql.getToken,[tel],function(err,result){
                    if(result[0])
                    {
                        //console.log("查到的token值:"+result[0].token);
                        if(token==result[0].token)
                        {
                            //console.log("登录成功");
                            responseDate.status=0;
                            responseDate.token=token;
                        }
                        else{console.log("token不匹配");responseDate.status=1}
                        res.json(responseDate);
                    }
                    else
                    {
                        console.log("没查到该号码的token");
                    }
                });
                conn.release();
            })
        }
        else
        {
            console.log("提交的token为空");
        }
    });
//退出
    router.post("/fuck",function(req,res){
        console.log("sign_out");
        if(req.body.token)
        {
            var token=req.body.token;
            var tel=jwt.decode(token,"jianshu");
            console.log("解析出来的tel:"+tel);
            var pool=mysql.createPool(DBconfig.mysql);
            pool.getConnection(function(err,conn){
                if(err){console.log("数据库连接失败:"+err);return false;}
                conn.query(sql.updateToken,["0",tel],function(err,result){
                    if(err){console.log("查询语句出错:"+err);return false;}
                    if(result)
                    {
                        console.log(JSON.stringify(result));
                    }
                });
                conn.release();
            })
        }
        else{console.log("token为空:"+req.body.token);}
    });

//信息的完善
    router.post("/perfect/:who",function(req,res){
        console.log("perfect");
        console.log(req.ip);
        var responseData={};
        //基础信息
        if(req.params.who=='base')
        {
            console.log(req.params.who);
            if(req.body.nickname && req.body.email && req.body.token)
            {
                var email=req.body.email.trim();
                var nick=req.body.nickname.trim();
                var token=req.body.token;
                //使用正则对数据进行判断
                var reg=/^((?=[\x21-\x7e]+)[^A-Za-z0-9])/;
                if(reg.test(nick))
                {
                    console.log("nick的值为:"+nick);
                    responseData.status=2;//昵称格式错误
                    res.json(responseData);
                    return false;
                }
                var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/g;
                if(!reg.test(email))
                {
                    responseData.status=3;//邮箱格式错误
                    res.json(responseData);
                    return false;
                }
                var pool=mysql.createPool(DBconfig.mysql);
                pool.getConnection(function(err,conn){
                    if(err){console.log("数据库连接失败"+err);return false;}
                    //进行异地登录判断  由token可得出tel
                    //可通过查看数据库中的token是否一致来判断是否是同一个人
                    var tel=jwt.decode(token,"jianshu");
                    conn.query(sql.getToken,[tel],function(err,result){
                        if(err){console.log("查询语句出错:"+err);return false;}
                        if(result[0])
                        {
                            //console.log(JSON.stringify(result));
                            if(result[0].token==token)
                            {
                                console.log("没有异地登录");
                                //nickname email
                                conn.query(sql.updateInfo,[nick,email,tel],function(err,result){
                                    if(err){console.log("查询语句出错:"+err); return false;}
                                    if(result)
                                    {
                                        //console.log(JSON.stringify(result));
                                        responseData.status=0;
                                        res.json(responseData);
                                    }
                                    else
                                    {
                                        console.log("插入失败");
                                    }
                                });
                            }
                            else{
                                //监听到token不一致时
                                responseData.status=6;//代表异地登录
                                res.json(responseData);
                            }
                        }
                        else
                        {
                            console.log("该token不存在");
                        }
                        conn.release();
                    })
                });

            }
            else
            {
                console.log("数据为空");
                responseData.status=1;//提交的数据为空
            }
        }

        //个人信息
        if(req.params.who=='person')
        {
            console.log(JSON.stringify(req.body));
            //{"token":token,"sex":sex,"introduce":introduce,"weburl":weburl};
            if(req.body.token && req.body.sex && req.body.introduce && req.body.weburl)
            {
                var token=req.body.token;
                var introduce=req.body.introduce.trim();
                var weburl=req.body.weburl.trim();
                var sex=req.body.sex.trim();
                if(sex!=1 && sex!=2 && sex!=3)
                {
                    responseData.status=1;//性别错误
                    res.json(responseData);
                    console.log("sex错误");
                    return false;
                }
                //introduce 去空格，判断长度
                introduce=introduce.replace(/[\r\n]+/g,"");
                if(introduce.length>300)
                {
                    responseData.status=1;//介绍内容太长
                    res.json(responseData);
                    console.log("介绍错误");

                    return false;
                }
                var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
                if(!reg.test(weburl))
                {
                    responseData.status=2;//网址不匹配
                    res.json(responseData);
                    console.log("网址错误");
                    return false;
                }
                var pool=mysql.createPool(DBconfig.mysql);
                pool.getConnection(function(err,conn){
                    if(err){console.log("数据库连接失败:"+err); return false;}
                    var tel=jwt.decode(token,"jianshu");
                    conn.query(sql.getToken,[tel],function(err,result){
                        if(err){cosole.log("查询语句出错:"+err);return false;}
                        if(result[0])
                        {
                            //console.log(JSON.stringify(result));
                            if(result[0].token==token)
                            {
                                console.log("没有异地");
                                //update user set sex=?,introduce=?,weburl=? where tele=?
                                conn.query(sql.updatePersonInfo,[sex,introduce,weburl,tel],function(err,result){
                                    if(err){console.log("数据库连接失败:"+err);return false;}
                                    if(result)
                                    {
                                        responseData.status=0;
                                        res.json(responseData);
                                    }
                                })
                            }
                            else
                            {
                                console.log("异地");
                                responseData.status=6;
                                res.json(responseData);
                            }
                        }
                        conn.release();
                    });
                });


            }
        }
        //帐号管理
        if(req.params.who=='user')
        {
            console.log("user");
        }

        //上传文件
        if(req.params.who=="upfile")
        {
            console.log(req.headers.author);
            var form=new multiparty.Form();
            //console.log("目录:"+__dirname);//目录:D:\jianshu\job\routes
            //console.log("路径:"+__filename);//路径:D:\jianshu\job\routes\admin.js
           // form.uploadDir=path.join(__dirname,"/angular/src/assets/upfile/");
           //  var dir=path.join(__dirname,"/angular/src/assets/upfile");
            var dir="../angular/src/assets/upfile";
            form.uploadDir=dir;
            //console.log("配置的目录:"+form.uploadDir);
            form.parse(req,function(err,filed,file){
                if(err){
                    //console.log("上传文件失败"+err);
                    responseData.status=1;
                    res.json(responseData);
                    return false;
                }
                //console.log(file);
                var tempName=file.photo[0].path.split("\\");
                var oldName=path.join(dir,tempName[tempName.length-1]);
                //console.log(oldName);
                var type=oldName.split(".");
                type=type[type.length-1].toLowerCase();
                var size=file.photo[0].size;
               // console.log(type);

                if(type!="jpg" && type=="jpeg" && type=="png")
                {
                    responseData.status=2;//格式错误
                    res.json(responseData);
                    return false;
                }

                if(parseInt(size)>6291456)
                {
                   // console.log(size);
                    responseData.status=3;
                    res.json(responseData);
                    return false;
                }

                var time=new Date().getTime();
               // console.log("时间:"+time);
                var newName=path.join(dir,time+"."+type);
                //console.log("新名字"+newName);
               // console.log("老名字"+oldName);
                fs.rename(oldName,newName,function(err){
                    if(err)
                    {console.log(err);
                        responseData.status=4;//重命名错错误
                        res.json(responseData);
                        return false;
                    }
                    else
                    {
                        //console.log("更名成功");
                        var pool=mysql.createPool(DBconfig.mysql);
                        pool.getConnection(function (err,conn) {
                            if(err){console.log("数据库连接失败"+err);return false;}
                            var token=req.headers.author;
                            var tel=jwt.decode(token,"jianshu");
                            conn.query(sql.selectHeader,[tel],function(err,result){
                                if(err){console.log("查询语句出错:"+err);return false;}
                                if(result[0].head)
                                {
                                    var oldHead=result[0].head;
                                    oldHead=path.join(dir,oldHead);
                                    //console.log(oldHead);

                                    fs.unlink(oldHead,function (err) {
                                        if(err) {console.log("删除失败:"+err);}
                                        console.log('删除成功')}
                                    )

                                    //console.log(result[0].heade)//undefined
                                    //console.log(Boolean(result[0].head));//false
                                }
                                var headPhoto=time+"."+type;
                                console.log("要插入的图片的地址:"+headPhoto);
                                conn.query(sql.insertHead,[headPhoto,tel],function(err,result){
                                    if(err){console.log("查询语句出错:"+err);return false;}
                                    if(result)
                                    {
                                        console.log("保存成功");
                                        responseData.status=0;
                                        res.json(responseData);
                                    }
                                    conn.release();
                                });

                            });
                        })
                    }
                });
            });
        }


    });
module.exports=router;