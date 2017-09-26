/**
 * Created by Administrator on 2017/9/24.
 */
function getStyle(obj,name)
{
  if(obj.currentStyle)
  {
    return obj.currentStyle[name];
  }
  else
  {
    return getComputedStyle(obj,false)[name];
  }
}
function move(obj,json,fn)
{
  clearInterval(obj.timer);
  obj.timer=setInterval(function(){
    var bStop=true;
    var cur=null;
    var speed=null;
    for(var attr in json)
    {
      if(attr=='opacity')
      {
        cur=Math.round(parseFloat(getStyle(obj,attr))*100);

      }
      else
      {
        cur=parseInt(getStyle(obj,attr));
      }

      speed=json[attr]-cur;
      speed=speed>0?Math.ceil(speed/7) : Math.floor(speed/7);

      if(json[attr]!=cur)
      {
        bStop=false;
      }

      if(attr=='opacity')
      {
        obj.style.filter='alpha(opacity:'+(cur+speed)+')';
        obj.style.opacity=(cur+speed)/100;
      }
      else
      {
        obj.style[attr]=cur+speed+'px';

      }

    }
    if(bStop==true)
    {
      clearInterval(obj.timer);
      if(fn)
      {
        fn();
      }
    }

  },30);
}
window.onload=function()
{
  var oTurn_left=document.getElementById('turn_left');
  console.log(oTurn_left);
  var aLeft_li=oTurn_left.getElementsByTagName("li");
  console.log(aLeft_li);
  var oTurn_right=document.getElementById("turn_right");
  var aRight_li=oTurn_right.getElementsByTagName("li");
  var oMain_header=document.getElementById("main_header");
  var oTurn_player=document.getElementById("turn_player");
  var oPlayer_left=document.getElementById("player_left");
  var oPlayer_right=document.getElementById("player_right");
  var nowIndex=0;
  function turn_run(){
    nowIndex=nowIndex+1;
    if(nowIndex>6)
    {
      nowIndex=0;
    }
    if(nowIndex<0)
    {
      nowIndex=6
    }
    move(oTurn_right,{marginTop:-aRight_li[0].offsetHeight*nowIndex});
    move(oTurn_left,{marginTop:-aLeft_li[0].offsetHeight*nowIndex});
  }

  function turn_next(nowIndex){
    console.log(nowIndex);
    move(oTurn_right,{marginTop:-aRight_li[0].offsetHeight*nowIndex});
    move(oTurn_left,{marginTop:-aLeft_li[0].offsetHeight*nowIndex});
  }
  turn_run();
  oPlayer_left.onclick=function(){
    nowIndex=nowIndex+1;
    if(nowIndex>=7)
    {nowIndex=0}
    turn_next(nowIndex);
  };
  oPlayer_right.onclick=function(){
    nowIndex=nowIndex-1;
    if(nowIndex<=-1)
    {nowIndex=6}
    turn_next(nowIndex);
  };

  var turn_timer=setInterval(turn_run,4000);

  oTurn_player.onmouseover=oMain_header.onmouseover=function(){
    clearInterval(turn_timer);
    oTurn_player.style.display="block";
  };
  oTurn_player.onmouseout=oMain_header.onmouseout=function () {
    turn_timer=setInterval(turn_run,4000);
    oTurn_player.style.display="none";
  }

  //theme.js
  theme_js();

  //搜索框的移动

};
