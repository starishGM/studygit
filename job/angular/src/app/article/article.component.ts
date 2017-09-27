import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {GetArticalService} from "../services/getartical.service";
import {FilterPipe} from "../filter.pipe";
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers:[GetArticalService,FilterPipe]
})
export class ArticleComponent implements OnInit {

  articalId:number;//文章的id
  articalContent;//文章的信息

  authorInfo;//作者的详细信息


  likeComment:boolean=true;
  ascComment:boolean=false;
  descComment:boolean=false;
  commentShow(t:string){
    switch (t)
    {
      case "like":
        this.likeComment=true;
        this.ascComment=false;
        this.descComment=false;
        break;
      case "asc":
        this.likeComment=false;
        this.ascComment=true;
        this.descComment=false;
        break;
      case "desc":
        this.likeComment=false;
        this.ascComment=false;
        this.descComment=true;
        break;
    }
  }

  //点击评论、添加新评论、回复弹出
  writeContentHidden;//评论的显示与隐藏

  // write:boolean=false;
  write2:boolean=false;
  write22:boolean=false;
  write3:boolean=false;
  addShow(){
    //this.write=true;
    this.writeContentHidden={display:'block'};

  }

  addShow2(){
    this.write2=true;
  }
  addShow22(){
    this.write22=true;
  }
  addShow3(){
    this.write2=true;
  }
  //点击取消隐藏
  funContentHidden()
  {
    this.writeContentHidden={display:'none'};
    // console.log("a");
  }


  //举报弹框
  //点击x 或取消关闭
  report;
  cover1Show(){
    this.report={display:'none'};
  }
  //点击弹出

  reportShow(){
    this.report={display:'block'};
  }

  //点击评论
  funSendComment(comment){
    //获取评论
    console.log(comment);
    if(sessionStorage.getItem("token"))
    {
      var token=sessionStorage.getItem("token");
      var reg = /<[^>]*>|<\/[^>]*>/gm;
      var content=comment.replace(reg,"");
      if(content.length>500)
      {
        console.log("评论内容过长");
        return false;
      }
      var data=JSON.stringify({name:"jianshu",content:content,token:token,id:this.articalId});
      this.art.sendComment(data).subscribe(
        (data)=>{
          console.log(data);
        }
      );
    }
    else
    {
      console.log("请先登录");
    }
  }

  constructor(
    private route:ActivatedRoute,
    private art:GetArticalService,
    private filter:FilterPipe
  ) { }

  getAuthorInfo(that,userId){
    var data=JSON.stringify({name:"jianshu",userId:userId});
    that.art.getSingleAuthorInfo(data).subscribe(
      (data)=>{
        console.log("本文章作者的详细信息"+data);
        switch(""+data.status)
        {
          case "0":
            that.authorInfo=data.code;
            console.log(JSON.stringify(that.authorInfo));
            break;
          case "1":
            console.log("没有获取到数据");
        }
      }
    );
  }

  ngOnInit() {
    this.articalId=parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.articalId);

    this.writeContentHidden={display:'none'};

    //然后根据articalId查询关于文章的一些相关信息
    var data=JSON.stringify({name:"jianshu",id:this.articalId});
    var that=this;
    this.art.getSingleArtical(data)
      .subscribe(
        (data)=> {
          //console.log(data);
          switch(""+data.status)
          {
            case "0":
              that.articalContent=data.code;
              console.log(that.articalContent);
              console.log("作者的id"+that.articalContent[0].userid);
              that.getAuthorInfo(that,that.articalContent[0].userid);
              break;
            case "1":
              console.log("数据为空");
          }
        }
      )

    


  }
}
