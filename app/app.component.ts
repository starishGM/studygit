import {Component, OnInit, OnDestroy} from '@angular/core';
import { GlobalPropertyService } from './services/global-property.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';
  hiddenNavs: boolean;
  constructor(
    private glo: GlobalPropertyService
  ) { }

  ngOnInit() {
    this.hiddenNavs = this.glo.hiddenNavs;
  }
  ngAfterContentChecked() {
    this.hiddenNavs = this.glo.hiddenNavs;
  }
  ngOnDestroy() {
    this.glo.hiddenNavs = false;
  }
}


