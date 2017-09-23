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
    var data=JSON.stringify({"token":val});
    var headers=new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(this.url+"/admin/sign_remember",data,{headers:headers})
      .map(res=>res.json());
  }

  //退出
  sign_out(val)
  {
    var data=JSON.stringify({token:val});
    var headers=new Headers();
    headers.append("Content-Type","application/json");
    this.http.post(this.url+"/admin/sign_out",data,{headers:headers});
  }


}

