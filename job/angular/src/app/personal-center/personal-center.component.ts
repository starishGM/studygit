import {Component} from '@angular/core';
import { GlobalPropertyService } from './../services/global-property.service';

@Component({
  selector: 'app-personal-center',
  template: '<router-outlet></router-outlet>',
  templateUrl: './personal-center.component.html',
  styleUrls: ['./personal-center.component.css'],
  providers: []
})
export class PersonalCenterComponent {
  constructor(
    private glo: GlobalPropertyService
  ) { }

  ngOnInit() {

  }
  ngOnDestroy() {

  }


}
