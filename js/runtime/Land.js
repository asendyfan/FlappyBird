import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Land extends Sprite{

    constructor(){

        const img=Sprite.getImage('land')
        super(img,
            0,0,
            img.width,img.height,
            0,window.innerHeight-img.height,
            img.width,img.height);
        //我们需要加两个参数，因为要让land左右来回移动的话，要设置水平偏移量
        //地板的水平变化坐标
        this.landX=0;
        //地板的移动速度
        this.landSpeed=Director.getInstance().moveSpeed;
    }

    draw(){
        this.landX=this.landX+this.landSpeed;
        if(this.landX>=this.img.width-window.innerWidth){
            this.landX=0;
        }
        super.draw(this.img,
            0,0,
            this.srcW,this.srcH,
            -this.landX,this.y,
            this.width,this.height)
    }
}