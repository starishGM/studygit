import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categary',
  templateUrl: './categary.component.html',
  styleUrls: ['./categary.component.css']
})
export class CategaryComponent implements OnInit {

  commentCategary:boolean=true;
  newCategary:boolean=false;
  hotCategary:boolean=false;
  categaryShow(flag:string){
    switch(flag)
    {
      case "comment":
        this.commentCategary=true;
        this.newCategary=false;
        this.hotCategary=false;
        break;
      case "new":
        this.commentCategary=false;
        this.newCategary=true;
        this.hotCategary=false;
        break;
      case "hot":
        this.commentCategary=false;
        this.newCategary=false;
        this.hotCategary=true;
        break;

    }
  }

  //展开，收起
  open_close;
  close;
  openShow(){
    this.open_close={display:'block'};
    this.close={display:'none'};
  }
  closeShow(){
    this.close={display:'block'};
    this.open_close={display:'none'};
  }

  //弹框，点击弹出
  deleteHidden;
  deleteHidden2;
  listShow1(){
    this.deleteHidden={display:'block'};
  }

  listShow2(){
    this.deleteHidden2={display:'block'};
  }

  //弹框,点击关闭
  cover1Show(){
    // this.deleteHidden=true;
    this.deleteHidden={display:'none'};
  }

  cover2Show(){
    this.deleteHidden2={display:'none'};
  }


  constructor() { }

  ngOnInit() {

  }

}
