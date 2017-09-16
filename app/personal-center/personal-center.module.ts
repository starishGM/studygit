import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PersonalCenterComponent } from './personal-center.component';

import { PersonalCenterRoutingModule } from './personal-center-routing.module';

import { FormsModule } from '@angular/forms';


import { PerIndexComponent } from './per-index/per-index.component';
import { MyCollectionComponent } from './my-collection/my-collection.component';
import { MyLikeComponent } from './my-like/my-like.component';
import {GlobalPropertyService} from './../services/global-property.service';
@NgModule({
  declarations: [
    PersonalCenterComponent,
    PerIndexComponent,
    MyCollectionComponent,
    MyLikeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    PersonalCenterRoutingModule
  ],
  providers: [GlobalPropertyService],
  bootstrap: [PersonalCenterComponent]
})
export class PersonalCenterModule { }
