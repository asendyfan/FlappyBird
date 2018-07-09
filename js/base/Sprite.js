//精灵的基类，负责初始化精灵加载的资源和大小以及位置

import {DataStore} from "./DataStore.js";

export class Sprite{
    //es6特性，可以给参数赋予默认值，不至于让程序崩溃
    constructor(img=null,
                srcX=0, srcY=0,
                srcW=0, srcH=0,
                x=0,y=0,
                width=0,height=0){
        this.dataStore=DataStore.getInstance();
        this.ctx=this.dataStore.ctx;
        this.img=img;
        this.srcX=srcX;
        this.srcY=srcY;
        this.srcW=srcW;
        this.srcH=srcH;
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height;
    }

    static getImage(key){
        return DataStore.getInstance().res.get(key);
    }

/*    img 传入image对象
    srcX 要剪裁的起始X坐标
    srcY 要剪裁的起始Y坐标
    srcW 剪裁的宽度
    srcH 剪裁的高度
    x 放置的x坐标
    y 放置的y坐标
    width 放置所需要的宽度
    height 放置所需要的高度*/

    //我们写东西的话，要一步一步完善我们的基类，或者我们的基础框架
    //这是个必须要有的习惯，我们在写东西的时候，
    // 要把我们之前写的东西不断完善，让他变得越来越好，越来越精炼

    //为什么是在方法中传入参数？
    //因为如果想要复写这个方法，
    // 比如传入我们自定义的参数，
    //一些变化的值，我们就可以通过传参的方式去更改他
    //因为es6没有方法重载的特性，所以才采用这种方法
    draw(img=this.img,
         srcX=this.srcX,
         srcY=this.srcY,
         srcW=this.srcW,
         srcH=this.srcH,
         x=this.x,
         y=this.y,
         width=this.width,
         height=this.height){
        // canvas的drawImage负责把我们的位图资源进行剪裁，
        // 然后缩放，放置到我们的画布上，并且进行渲染
        this.ctx.drawImage(
            img,
            srcX, srcY,
            srcW, srcH,
            x,y,
            width,height
        );
    }

}