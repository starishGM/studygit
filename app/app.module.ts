import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {NewsComponent} from "./news/news.component";
import { StartComponent } from './start/start.component';
import {ConcrenComponent} from "./concren/concren.component";
import {CategaryComponent} from "./categary/categary.component";

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {PersonalCenterModule} from './personal-center/personal-center.module';
import {HomeComponent} from "./home/home.component";
import {GlobalPropertyService} from './services/global-property.service';
@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    StartComponent,
    HomeComponent,
    CategaryComponent,
    NewsComponent,
    ConcrenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalCenterModule,
    AppRoutingModule
  ],
  providers: [GlobalPropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
