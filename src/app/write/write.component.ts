import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  content:string="21312";
  constructor() { }

  ngOnInit() {
  }
}
