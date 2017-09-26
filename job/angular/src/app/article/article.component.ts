import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  likeComment:boolean=true;
  ascComment:boolean=false;
  descComment:boolean=false;
  commentShow(t:string){
    switch (t)
    {
      case "like":
        this.likeComment=true;
        this.ascComment=false;
        this.descComment=false;
        break;
      case "asc":
        this.likeComment=false;
        this.ascComment=true;
        this.descComment=false;
        break;
      case "desc":
        this.likeComment=false;
        this.ascComment=false;
        this.descComment=true;
        break;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
