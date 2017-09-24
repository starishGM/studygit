import { Injectable } from '@angular/core';

@Injectable()
export class GlobalPropertyService {
  hiddenNavs:boolean= true;//未登录状态
  token:string;//根据token是否存在来显示或隐藏导航条。

  test:number=0;
}

