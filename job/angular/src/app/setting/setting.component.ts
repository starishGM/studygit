import { Component, OnInit } from '@angular/core';
import {LoginService} from "../services/login.service";
@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css'],
  providers:[LoginService]
})
export class SettingComponent implements OnInit {
  baseSetting:boolean=true;
  personalSetting:boolean=false;
  userSetting:boolean=false;
  //选项卡
  settingShow(flag:string){
    switch(flag)
    {
      case "base":
        this.baseSetting=true;
        this.personalSetting=false;
        this.userSetting=false;
        break;
      case "personal":
        this.baseSetting=false;
        this.personalSetting=true;
        this.userSetting=false;
        break;
      case "user":
        this.baseSetting=false;
        this.personalSetting=false;
        this.userSetting=true;
        break;

    }
  }
  constructor(
    private login:LoginService
  ) { }

  saveInfo(nick,email)
  {
    console.log("nick:"+nick);
    console.log("email:"+email);
    //nickname email
    if(nick && email)
    {
      //昵称,邮箱的校验的校验
      if(sessionStorage.getItem("token"))
      {
        var token=sessionStorage.getItem("token");
        var sub={"token":token,"nickname":nick,"email":email};
        console.log(sub);
        this.login.perfect(sub,"base")
          .subscribe(
            (data)=>{
              console.log(data);
              //对返回的数据进行判断,顶部设置一个bs的alert警告框
            }
          );
      }
      else{console.log("token为空");}
    }
    else
    {console.log("不能为空");}
  }

  savePerson(sex,introduce,weburl)
  {
    //性别过滤，介绍300字，网址过滤
    console.log("性别:"+sex);
    console.log("介绍:"+introduce);
    console.log("网址:"+weburl);
    if(sex && introduce && weburl)
    {

      introduce=introduce.replace(/[\r\n]+/g,"");
      if(introduce.length>300)
      {
        return false;
      }
      var reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
      if(!reg.test(weburl))
      {
        return false;
      }

      if(sessionStorage.getItem("token"))
      {

        var token=sessionStorage.getItem("token");
        var sub={"token":token,"sex":sex,"introduce":introduce,"weburl":weburl};

        var content=introduce.replace(/[\r\n]+/g,"");
        //console.log("过滤后的值为:"+content);
        //console.log("过滤后的值为:"+content.length);
        this.login.perfect(sub,"person")
          .subscribe(
            (data)=>{
              console.log(data);
              //对返回的数据进行判断,顶部设置一个bs的alert警告框
            }
          );

      }
      else{
        console.log("token为空");
      }
    }
    else
    {
      console.log("提交的数据不能为空");
    }
  }


  ngOnInit() {
  }

}
