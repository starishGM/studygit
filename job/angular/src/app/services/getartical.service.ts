import { Injectable } from '@angular/core';
import {Http,Headers} from "@angular/http";
import "rxjs/add/operator/map";
@Injectable()
export class GetArticalService{
  url="http://localhost:3000";
  constructor(private http:Http){}
  //获取主题目录信息
  get_theme(val,url){
    // var data=JSON.stringify(val);
    var headers=new Headers();
    headers.append("Content-Type","application/json");
    return this.http.post(this.url+"/home/category/"+url,val,{headers:headers})
      .map(
        res=>res.json()
      );
  }

  //提交文章内容
  uploadArtical(data){
    var headers=new Headers({"Content-Type":"application/json"});
    return this.http.post(this.url+"/home/uploadartical",data,{headers:headers})
     .map(res=>res.json());
  }

  //获取文章内容
  getArticalDetail(data){
    var headers=new Headers({"Content-Type":"application/json"});
    return this.http.post(this.url+"/home/getArticalDetail",data,{headers:headers})
      .map(res=>res.json());
  }

  //获取推荐作者
  getRecommendAuthor(data){
    var headers=new Headers({"Content-Type":"application/json"});
    return this.http.post(this.url+"/home/getRecommendAuthor",data,{headers:headers})
      .map(res=>res.json());
  }

  //获取单个文章的信息
  getSingleArtical(data){
    var headers=new Headers({"Content-Type":"application/json"});
    return this.http.post(this.url+"/home/getSingleArtical",data,{headers:headers})
      .map(res=>res.json());
  }
  //发送评论
  sendComment(data){
    var headers=new Headers({"Content-Type":"application/json"});
    return this.http.post(this.url+"/home/sendComment",data,{headers:headers})
      .map(res=>res.json());
  }

  //获取每篇文章的作者详细信息

  getSingleAuthorInfo(data){
    var headers=new Headers({"Content-Type":"application/json"});
    return this.http.post(this.url+"/home/getSingleAuthorInfo",data,{headers:headers})
      .map(res=>res.json());
  }

}

