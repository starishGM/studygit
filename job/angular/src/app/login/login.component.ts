import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {GlobalPropertyService} from "../services/global-property.service";
import {LocationStrategy} from "@angular/common";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[LoginService,GlobalPropertyService]
  //Router该模块不需要注入
  //注意that
})
export class LoginComponent {
  remember:Boolean=false;//记住密码
  password;
  telephone;

  errPasswordShow:Boolean;
  errTelephoneShow:Boolean;

  errPasswordContent:string;
  errTelephoneContent:string;

  responseData;
  constructor(
    private login:LoginService,
    private route:Router,
    public global:GlobalPropertyService
  ) { }

  checkTel(tel)
  {
    //console.log(tel);
    if(tel)
    {
      var reg=/^\d{11}$/g;
      if(!reg.test(tel))
      {
        this.errTelephoneContent="手机号码格式错误";
        this.errTelephoneShow=true;
        return false;
      }
    }
    if(!tel)
    {
      this.errTelephoneContent="手机号码不能为空";
      this.errTelephoneShow=true;
      return false;
    }
    this.errTelephoneContent="";
    this.errTelephoneShow=false;
    return true;//正确
  }

  checkPassword(password)
  {
    //console.log(password);
    if(password)
    {
      var reg=/^\w{6,16}$/g;
      if(!reg.test(password))
      {
        this.errPasswordContent="密码由6-16位字母和数字组成";
        this.errPasswordShow=true;
        return false;
      }
    }
    if(!password)
    {
      this.errPasswordContent="密码不能为空";
      this.errPasswordShow=true;
      return false;
    }
    this.errPasswordContent="";
    this.errPasswordShow=false;
    return true;//都正确的时候
  }

  tologin(val){
    console.log(this.remember);
    var that=this;
    var tel=this.checkTel(val.telephone);
    var pwd=this.checkPassword(val.password);

    //console.log(this.password);
    //console.log(this.telephone);
    if(tel && pwd)
    {
      //提交数据
      console.log(val);
      this.login.sign_in(val)
       .subscribe(
         (data)=>{
           this.responseData=data;
           console.log(JSON.stringify(data));
           switch(""+data.status)
           {
             case "0":
               that.global.token=data.token;
               that.global.hiddenNavs=true;
               if(that.remember)
               {
                 localStorage.setItem("token",data.token);
                 console.log("login本地存储:"+localStorage.getItem("token"));
               }
               sessionStorage.setItem("token",data.token);
               console.log("登录成功"+sessionStorage.getItem("token"));

               that.route.navigate(['']);
               break;
             case "4":
               this.errPasswordShow=true;
               this.errPasswordContent="密码错误";
               break;
           }
         }
       );
    }
  }


  ngOnInit() {
    this.errPasswordShow=false;
    this.errTelephoneShow=false;
  }



}
