/**
 * Created by 李慧 on 2017/9/14.
 */
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from "./home/home.component";
import { AppComponent } from './app.component';
import {NewsComponent} from "./news/news.component";
import { StartComponent } from './start/start.component';
import {ConcrenComponent} from "./concren/concren.component";
import {CategaryComponent} from "./categary/categary.component";
import {SettingComponent} from "./setting/setting.component";
import {WriteComponent} from "./write/write.component";
import {SevenComponent} from "./seven/seven.component";
import {ThirtyComponent} from "./thirty/thirty.component";
import {SearchComponent} from "./search/search.component";
import {ConcrenmenuComponent} from "./concrenmenu/concrenmenu.component";

import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
const  appRoute: Routes = [
  {
    path:'concren',
    component:ConcrenComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path:'category',
    component:CategaryComponent
  },
  {
    path:'setting',
    component:SettingComponent
  },
  {
    path:"news",
    component:NewsComponent
  },
  {
    path:'write',
    component:WriteComponent
  },
  {
    path:"seven",
    component:SevenComponent
  },
  {
    path:'thirty',
    component:ThirtyComponent
  },
  {
    path:'search',
    component:SearchComponent
  },
  {
    path:'concrenmenu',
    component:ConcrenmenuComponent
  },
  {
    path:'',
    component:HomeComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export  class AppRoutingModule {}
