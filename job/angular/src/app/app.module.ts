import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from "@angular/http";

import {FilterPipe} from "./filter.pipe";

import { CommonModule }     from '@angular/common';
import { FileUploadModule } from 'ng2-file-upload';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {NewsComponent} from "./news/news.component";
import { StartComponent } from './start/start.component';
import {ConcrenComponent} from "./concren/concren.component";
import {CategaryComponent} from "./categary/categary.component";
import { SettingComponent } from './setting/setting.component';
import { WriteComponent } from './write/write.component';
import {SearchComponent} from "./search/search.component";
import {ArticleComponent} from "./article/article.component"

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import {HomeComponent} from "./home/home.component";
import {PersonalCenterModule} from "./personal-center/personal-center.module";


import {GlobalPropertyService} from './services/global-property.service';
import { SevenComponent } from './seven/seven.component';
import { ThirtyComponent } from './thirty/thirty.component';
import { ConcrenmenuComponent } from './concrenmenu/concrenmenu.component';
import { ThemeComponent } from './theme/theme.component';

@NgModule({
  declarations: [
    FilterPipe,
    AppComponent,
    RegisterComponent,
    LoginComponent,
    StartComponent,
    HomeComponent,
    CategaryComponent,
    NewsComponent,
    ConcrenComponent,
    SettingComponent,
    WriteComponent,
    SevenComponent,
    ThirtyComponent,
    SearchComponent,
    ConcrenmenuComponent,
    ArticleComponent,
    ThemeComponent,
    FilterPipe
  ],
  imports: [
    FileUploadModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    PersonalCenterModule,
    AppRoutingModule
  ],
  providers: [GlobalPropertyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
