import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import { FileUploader } from 'ng2-file-upload';
import {Http,Headers} from "@angular/http";
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers:[LoginService]
})
export class SettingComponent implements OnInit {
  showResult:string;//上传头像返回的结果
  resultHidden:boolean=false;//显示结果的隐藏

  baseSetting:boolean=true;
  personalSetting:boolean=false;
  userSetting:boolean=false;

  token=sessionStorage.getItem("token");
  uploader:FileUploader = new FileUploader({
    url: "http://localhost:3000/admin/perfect/upfile",
    method: "POST",
    itemAlias: "photo",
    headers:[{name:"author",value:this.token}]
  });
  //选项卡
  settingShow(flag:string){
    switch(flag)
    {
      case "base":
        this.baseSetting=true;
        this.personalSetting=false;
        this.userSetting=false;
        break;
      case "personal":
        this.baseSetting=false;
        this.personalSetting=true;
        this.userSetting=false;
        break;
      case "user":
        this.baseSetting=false;
        this.personalSetting=false;
        this.userSetting=true;
        break;

    }
  }
  constructor(
    private login:LoginService
  )
  {
    if(sessionStorage.getItem("token"))
    {
      this.token=sessionStorage.getItem("token");
      console.log(this.token);
    }else
    {
      console.log("token为空:"+sessionStorage.getItem("token"));
    }
  }

  //保存基本信息
  saveInfo(nick,email)
  {
    if(nick && email)
    {

      var reg=/^((?=[\x21-\x7e]+)[^A-Za-z0-9])/;
      if(reg.test(nick))
      {
        console.log("nick的值为:"+nick);
        this.showResult="昵称由英文，字母，数字组成";
        this.resultHidden=true;
        var that=this;
        setTimeout(function(){
          that.resultHidden=false;
        },3000);
        return false;
      }
      var reg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+$/g;
      if(!reg.test(email))
      {
        this.showResult="邮箱格式错误";
        this.resultHidden=true;
        var that=this;
        setTimeout(function(){
          that.resultHidden=false;
        },3000);
        return false;
      }

      if(sessionStorage.getItem("token"))
      {
        var token=sessionStorage.getItem("token");
        var sub={"token":token,"nickname":nick,"email":email};
        console.log(sub);
        var that=this;
        this.login.perfect(sub,"base")
          .subscribe(
            (data)=>{
              console.log(data);
              //对返回的数据进行判断,顶部设置一个bs的alert警告框
              switch(""+data.status)
              {
                case "0":
                  that.showResult="保存成功";
                  break;
                case "6":
                  that.showResult="注意！您的帐号在别处登录";
                  sessionStorage.setItem("token",null);
                  localStorage.setItem("token",null);
                  break;
                default:
                  that.showResult="保存失败!";
              }
              that.resultHidden=true;
              setTimeout(function(){
                that.resultHidden=false;
              },3000);

            }
          );
      }
      else{
        this.showResult="请先登录";
        this.resultHidden=true;
        setTimeout(function(){
          that.resultHidden=false;
        },3000);
      }
    }
    else
    {
      this.showResult="前先填写";
      console.log("nihao");
      this.resultHidden=true;
      var that=this;
      setTimeout(function(){
        that.resultHidden=false;
      },3000);
    }
  }
  //保存个人信息
  savePerson(sex,introduce,weburl)
  {
    if(sex && introduce && weburl)
    {
      introduce=introduce.replace(/[\r\n]+/g,"");
      if(introduce.length>300)
      {
        this.showResult="内容不能超过300字哦！";
        this.resultHidden=true;
        var that=this;
        setTimeout(function(){
          that.resultHidden=false;
        },3000);
        return false;
      }
      var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
      if(!reg.test(weburl))
      {
        this.showResult="地址输入错误";
        this.resultHidden=true;
        var that=this;
        setTimeout(function(){
          that.resultHidden=false;
        },3000);
        return false;
      }
      if(sex!=1 && sex!=2 && sex!=3)
      {
        this.showResult="请填写性别";
        this.resultHidden=true;
        var that=this;
        setTimeout(function(){
          that.resultHidden=false;
        },3000);
        return false;
      }

      if(sessionStorage.getItem("token"))
      {
        var token=sessionStorage.getItem("token");
        var sub={"token":token,"sex":sex,"introduce":introduce,"weburl":weburl};
        console.log("开始上传个人信息");
        var that=this;
        this.login.perfect(sub,"person")
          .subscribe(
            (data)=>{
              console.log(data);
              switch(""+data.status)
              {
                case "0":
                  that.showResult="保存成功";
                  break;
                case "6":
                  that.showResult="注意！您的帐号在别处登录";
                  sessionStorage.setItem("token",null);
                  localStorage.setItem("token",null);
                  break;
                default:
                  that.showResult="保存失败!";
              }
              that.resultHidden=true;
              setTimeout(function(){
                that.resultHidden=false;
              },3000);
            }
          );

      }
      else{
        this.showResult="请先登录";
        this.resultHidden=true;
        var that=this;
        setTimeout(function(){
          that.resultHidden=false;
        },3000);
      }
    }
    else
    {
      this.showResult="前先填写";
      console.log("nihao");
      this.resultHidden=true;
      var that=this;
      setTimeout(function(){
        that.resultHidden=false;
      },3000);
    }
  }
  //上传头像
  selectedFileOnChanged(){
    //还需要对图片进行过滤
    console.log("要上传的图片个数:"+this.uploader.queue.length);
    var that=this;
    this.uploader.queue[0].onSuccess=function(res,state,header){
      if(state==200)
      {
        console.log("上传成功");
      }
      else {console.log("上传失败");}
      // console.log(res.status);
      var data=JSON.parse(res);
      switch(""+data.status)
      {
        case "0":
          console.log("上传成功");
          that.showResult="上传成功";
          break;
        case "1":
          that.showResult="上传文件失败";
          break;
      }

      that.resultHidden=true;
      setTimeout(function(){
        that.resultHidden=false;
      },3000);

    };
    if(this.token)
    {this.uploader.queue[0].upload();}
    else
    {
      this.showResult="请先登录";
      this.resultHidden=true;
      setTimeout(function(){
        that.resultHidden=false;
      },3000);
    }
  }

  //隐藏显示结果
  funcHidenResult(){
    this.resultHidden=false;
  }


  ngOnInit() {

  }

}
