import {Component, ElementRef, Renderer, Output, EventEmitter ,OnInit} from '@angular/core'
import * as wangEditor from "../../assets/javascript/wangEditor.js";
import {GetArticalService} from "../services/getartical.service";

@Component({
  selector: 'write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css'],
  providers:[GetArticalService]
})
export class WriteComponent implements OnInit{

  selectMenu;
  callbackContent;
  resultHidden:boolean=false;
  private editor:any;
  //@Output() onPostData = new EventEmitter();

  constructor(
    private el: ElementRef,
    private renderer: Renderer,
    private getArtical:GetArticalService
  ) { }

  ngAfterViewInit() {
    let editordom = this.el.nativeElement.querySelector('#editorElem');
    this.editor = new wangEditor(editordom);
    this.editor.customConfig.uploadImgShowBase64 = true;
    this.editor.create()
  }

  //结果的显示与隐藏
  funResultHidden(){
    this.resultHidden=false;
  }
  //清空内容
/*  clearContent(){
    this.editor.txt.clear();
  }*/

  //获取内容;
  clickHandle(title,category,sel):any {
    let data = this.editor.txt.html();//text表示获取文本
    //return data
    //console.log("标题:"+title+"类别:"+category);
    //console.log(data);
    console.log(sel);
    if(title.length>100 || !title || title.length==0)
    {
      console.log(title.length);
      console.log("标题格式错误");
      this.callbackContent="标题格式错误";
      this.resultHidden=true;
      var that=this;
      setTimeout(function(){
        that.resultHidden=false;
      },3000);
      return false;
    }
    var reg=/^\d{1,2}$/;
    if(!reg.test(category))
    {
      console.log("内容类别错误");
      return false;
    }
    console.log(data);

    if(data.length>30000 || data=="<p><br></p>")
    {
      console.log("内容太长");
      this.callbackContent="内容格式错误";
      this.resultHidden=true;
      var that=this;
      setTimeout(function(){
        that.resultHidden=false;
      },3000);
      return false;
    }
    var reg = /<[^>]*>|<\/[^>]*>/gm;
    var con=data.replace(reg,"");
    var size=con.length;
    console.log(size);
    if(sessionStorage.getItem("token"))
    {

      var token=sessionStorage.getItem("token");
      var sub=JSON.stringify({name:"jianshu",size:size,token:token,artical:data,title:title,category:category});
      var that=this;
      this.getArtical.uploadArtical(sub)
        .subscribe(
          (data)=>{
            console.log(data);
            switch(""+data.status)
            {
              case "0":
                console.log("保存成功");
                //保存成功之后清除页面内容
                that.callbackContent="保存成功";
                that.resultHidden=false;
                that.editor.txt.clear();
                break;
              case "1":
                console.log("保存失败");
                that.callbackContent="保存失败";
                break;
              case "6":
                console.log("异地登录");
                that.callbackContent="注意!您的帐号在别处登录！";
                sessionStorage.removeItem("token");
                localStorage.removeItem("token");
                break;
            }
            that.resultHidden=true;
            setTimeout(function(){
              that.resultHidden=false
            },3000);
          }
        );

    }
    else
    {
      console.log("请先登录");
      this.callbackContent="请先登录";
      this.resultHidden=true;
      setTimeout(function(){
        this.resultHidden=false;
      },3000);
    }

  }

  ngOnInit(){
    this.resultHidden=false;
    var sub=JSON.stringify({name:'jianshu'});
    var that=this;
    this.getArtical.get_theme(sub,"allTheme")
      .subscribe(
        (data)=>{
          console.log(data);
          switch(""+data.status)
          {
            case "0":
              that.selectMenu=data.code;
              console.log(this);
              break;

            case "1":
              console.log("没有获取到数据");
              break;
          }
        }
      );
  }

}
