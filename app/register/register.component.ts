import { Component, OnInit } from '@angular/core';
import {GlobalPropertyService} from './../services/global-property.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private glo: GlobalPropertyService
  ) { }

  ngOnInit() {
    this.glo.hiddenNavs = false;
    console.log('init' + this.glo.hiddenNavs);
  }
  ngOnDestroy() {
    this.glo.hiddenNavs = true;

  }
}
