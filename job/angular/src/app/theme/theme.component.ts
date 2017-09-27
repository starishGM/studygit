import { Component, OnInit } from '@angular/core';
import {GetArticalService} from "../services/getartical.service";
import {FilterPipe} from "../filter.pipe";
@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.css'],
  providers:[GetArticalService,FilterPipe],
})
export class ThemeComponent implements OnInit {

  allThemeContent;

  constructor(
    private getArtical:GetArticalService
  ) { }

  ngOnInit() {
    var sub=JSON.stringify({name:'jianshu'});
    this.getArtical.get_theme(sub,"allTheme")
      .subscribe(
        (data)=>{
          console.log(data);
          switch(""+data.status)
          {
            case "0":
              this.allThemeContent=data.code;
              break;

            case "1":
              console.log("没有获取到数据");
              break;
          }
        }
      );
  }

}
