import { Component, OnInit } from '@angular/core';
import {GlobalPropertyService } from "../services/global-property.service"
import {LoginService} from "../services/login.service";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers:[LoginService],
})
export class HomeComponent implements OnInit {
  constructor(
    private login:LoginService
  ) { }

  ngOnInit() {

  }

}
