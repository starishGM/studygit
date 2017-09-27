import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router'
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  articalId:number;//文章的id

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


  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit() {
    this.articalId=parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.articalId);

    //然后根据articalId查询关于文章的一些相关信息

    this.writeContentHidden={display:'none'};
  }

}
