import {Component, OnInit, OnDestroy,AfterContentChecked} from '@angular/core';
import {LoginService} from "./services/login.service";

import {GlobalPropertyService} from "./services/global-property.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService,GlobalPropertyService]
})
export class AppComponent {

  personalHead:string;//头像

  hiddenNavs: boolean=false;//隐藏登录状态

  navbarHidden:boolean=true;//隐藏整个导航条

  showSelect:boolean=false;
  alertHidden:boolean=false;
  constructor(
    private login:LoginService,
    public global:GlobalPropertyService
  ) {}

  //个人信息下拉框的显示与隐藏
  funcShowSelect(){
    this.showSelect=true;
    console.log("a");
  }
  funcHiden(){
    this.showSelect=false;
    console.log("a");
  }

  ngOnInit() {
    //每次刷新该组件时都会执行该操作
    //报错之后该方法会再次执行
    // sessionStorage.removeItem("token")
    this.hiddenNavs = Boolean(sessionStorage.getItem("token"));
    this.navbarHidden=true;
    this.alertHidden=false;
    console.log("导航条的值:"+Boolean(sessionStorage.getItem("token")));
    console.log("apptoken的值:"+ sessionStorage.getItem("token"));

    //头像由于是一个变量当页面一刷新，变量就重新初始化，导致头像不显示。
    this.personalHead=sessionStorage.getItem("head");//显示头像

    //记住密码登录
    if(sessionStorage.getItem("token")){
      console.log("已经登录");
    }else
    {
      if(localStorage.getItem("token"))
      {
        var that=this;
        this.login.sign_remember(localStorage.getItem("token"))
          .subscribe(
            (data)=>{
              switch(""+data.status)
              {
                case "0":
                  sessionStorage.setItem("token",data.token);
                  console.log("再次登录成功");
                  sessionStorage.setItem("head",data.head);
                  that.personalHead=data.head;
                  console.log("头像地址:"+data.head);
                  break;
                case "1":
                  console.log("登录失败，可能篡改了localStorage的值");
              }
            }
          );
        console.log("记住密码登录"+localStorage.getItem("token"));
      }
    }

  }
  //退出
  log_out() {
    if (sessionStorage.getItem("token")) {
      var token=sessionStorage.getItem("token");
      this.login.fuck(sessionStorage.getItem("token")).subscribe(
        (data)=>console.log(data)
      );
      sessionStorage.removeItem("token");
      console.log("已经退出");
    }
    else
    {
      console.log("session为空");
    }
  }

  //警告框的显示与隐藏
  showAlert(){
    this.alertHidden=true;
  }

  ngAfterContentChecked(){
    this.hiddenNavs = Boolean(sessionStorage.getItem("token"));
  }
  ngOnDestroy() {

  }
}


