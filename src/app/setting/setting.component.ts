import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  baseSetting:boolean=true;
  personalSetting:boolean=false;
  userSetting:boolean=false;
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
  constructor() { }

  ngOnInit() {
  }

}
