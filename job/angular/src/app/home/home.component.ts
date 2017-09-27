import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {GetArticalService} from "../services/getartical.service";
import {FilterPipe} from "../filter.pipe";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[LoginService,GetArticalService,FilterPipe],
})
export class HomeComponent implements OnInit {

  categoryContent;//主题类别

  articalDetail;//文章的详细信息

  recommendAuthor;//推荐的作者
  page:number=5;//开始显示5个记录，没点击一次在加载5个记录

  constructor(
    private login:LoginService,
    private artical:GetArticalService,
    private filter:FilterPipe
  ) { }

  funGetMore(){
    this.page=this.page+5;
    console.log(this.page);
    var data=JSON.stringify({name:'jianshu',page:this.page});
    var that=this;
    this.artical.getArticalDetail(data).subscribe(
      (data)=>{
        console.log("page:"+data);
        switch(""+data.status)
        {
          case "0":
            that.articalDetail=data.code;
            console.log(that.articalDetail);
            break;
          case "1":
            console.log("数据为空");
        }

      }

    )
  }

  ngOnInit() {

    var data=JSON.stringify({name:'jianshu'});
    var that=this;
    //获取文章的主题
    this.artical.get_theme(data,"theme")
      .subscribe(
        (data)=> {
          //console.log(data);
          switch(""+data.status)
          {
            case "0":
              that.categoryContent=data.code;
              console.log(that.categoryContent);
              break;
            case "1":
              console.log("数据为空");
          }
        }
      );
    //获取文章的详细信息
    var data2=JSON.stringify({name:'jianshu',page:this.page});
    this.artical.getArticalDetail(data2)
      .subscribe(
        (data)=> {
          //console.log(data);
          switch(""+data.status)
          {
            case "0":
              that.articalDetail=data.code;
              console.log(that.articalDetail);
              break;
            case "1":
              console.log("数据为空");
          }
        }
      );


    var data3=JSON.stringify({name:"jianshu",page:5});
    this.artical.getRecommendAuthor(data3)
      .subscribe(
          (data)=> {
            //console.log(data);
            switch(""+data.status)
            {
              case "0":
                that.recommendAuthor=data.code;
                console.log(that.recommendAuthor);
                break;
              case "1":
                console.log("数据为空");
            }
        }
      )

  }
}
