/**
 * Created by 李慧 on 2017/9/14.
 */
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
//import { PersonalCenterComponent } from './personal-center/personal-center.component';

import {HomeComponent} from "./home/home.component";
import { AppComponent } from './app.component';
import {NewsComponent} from "./news/news.component";
import { StartComponent } from './start/start.component';
import {ConcrenComponent} from "./concren/concren.component";
import {CategaryComponent} from "./categary/categary.component";


import { NgModule } from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
const  appRoute: Routes = [

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
    path:'',
    component:HomeComponent
  }
];
@NgModule({
  imports: [RouterModule.forRoot(appRoute)],
  exports: [RouterModule]
})
export  class AppRoutingModule {}
