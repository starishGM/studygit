import {Component, OnInit, OnDestroy,AfterContentChecked} from '@angular/core';
import {LoginService} from "./services/login.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[LoginService]
})
export class AppComponent {
  hiddenNavs: boolean;//隐藏登录状态
  navbarHidden:boolean=true;//隐藏整个导航条
  constructor(
    private http:LoginService,
    private login:LoginService
  ) { }

  ngOnInit() {
    // sessionStorage.removeItem("token")
    this.hiddenNavs = Boolean(sessionStorage.getItem("token"));
    console.log("导航条的值:"+Boolean(sessionStorage.getItem("token")));
    console.log("apptoken的值:"+ sessionStorage.getItem("token"));
    this.navbarHidden=true;
    if(sessionStorage.getItem("token")){
      var token=sessionStorage.getItem("token");
      this.http.sign_remember(token);
    }else {console.log("token为空");}
  }

  sign_out() {
    if (sessionStorage.getItem("token")) {
      var token=sessionStorage.getItem("token");
      this.login.sign_out(token);
      sessionStorage.removeItem("token");
      console.log("已经退出");
    }
    else
    {
      console.log("session为空");
    }
  }
  ngAfterContentChecked(){
    this.hiddenNavs = Boolean(sessionStorage.getItem("token"));
  }
  ngOnDestroy() {

  }
}


