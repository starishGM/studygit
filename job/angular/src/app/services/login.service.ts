import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";
@Injectable()
export class LoginService{
  url="http://localhost:3000";
  constructor(private http:Http){}
  //登录
  sign_in(val){
    var data=JSON.stringify(val);
    var headers=new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(this.url+"/admin/sign_in",data,{headers:headers})
      .map(
        res=>res.json()
      );
  }
  //注册
  sign_up(val){
    var data=JSON.stringify(val);
    var headers=new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(this.url+"/admin/sign_up",data,{headers:headers})
      .map(res=>res.json());
  }

  //记住密码登录
  sign_remember(val){
    var data=JSON.stringify({token:val});
    var headers=new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(this.url+"/admin/login",data,{headers:headers})
      .map(res=>res.json());
  }

  //退出
  fuck(val)
  {
    var data=JSON.stringify({token:val});
    var headers=new Headers();
    headers.append("Content-Type", "application/json");
    return this.http.post(this.url+"/admin/fuck",data,{headers:headers})
      .map(res=>res.json());
  }

  //完善信息
  perfect(val,url)
  {
    var data=JSON.stringify(val);
    var headers=new Headers();
    headers.append("Content-Type","application/json");
    return  this.http.post(this.url+"/admin/perfect/"+url,data,{headers:headers})
      .map(res=>res.json());
  }


}

