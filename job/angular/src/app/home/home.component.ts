import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
import {GetArticalService} from "../services/getartical.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[LoginService,GetArticalService],
})
export class HomeComponent implements OnInit {

  categoryContent;

  constructor(
    private login:LoginService,
    private artical:GetArticalService
  ) { }

  ngOnInit() {
    var data=JSON.stringify({name:'jianshu'});
    var that=this;
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
  }

}
