import {Component} from '@angular/core';
import { GlobalPropertyService } from './../services/global-property.service';

@Component({
  selector: 'app-personal-center',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css'],
  providers: []
})
export class PersonalCenterComponent {
  constructor(
    private glo: GlobalPropertyService
  ) { }

  ngOnInit() {
    this.glo.hiddenNavs = false;
  }
  ngOnDestroy() {
    this.glo.hiddenNavs = true;
  }


}
