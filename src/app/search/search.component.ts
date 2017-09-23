import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  articleSearch:boolean=true;
  userSearch:boolean=false;
  thematicSearch:boolean=false;
  articlesSearch:boolean=false;
  SearchShow(flag:string){
    switch(flag)
    {
      case "article":
        this.articleSearch=true;
        this.userSearch=false;
        this.thematicSearch=false;
        this.articlesSearch=false;
        break;
      case "user":
        this.articleSearch=false;
        this.userSearch=true;
        this.thematicSearch=false;
        this.articlesSearch=false;
        break;
      case "thematic":
        this.articleSearch=false;
        this.userSearch=false;
        this.thematicSearch=true;
        this.articlesSearch=false;
        break;
      case "articles":
        this.articleSearch=false;
        this.userSearch=false;
        this.thematicSearch=false;
        this.articlesSearch=true;
        break;
    }
  }
  constructor() { }

  ngOnInit() {
  }

}
