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

  constructor(
    private login:LoginService,
    private artical:GetArticalService,
    private filter:FilterPipe
  ) { }


  ngOnInit() {
  /*
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
    this.artical.getArticalDetail(data)
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
  */
  }
}
