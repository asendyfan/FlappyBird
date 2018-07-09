import {Sprite} from "../base/Sprite.js";
import {Director} from "../Director.js";

export class Pencils extends Sprite{
    constructor(img,top){
        super(img,
            0,0,
            img.width,img.height,
            //刚好在右侧看不到的位置
            window.innerWidth,0,
            img.width,img.height
            );
        this.top=top;

    }
    draw(){
        this.x=this.x-Director.getInstance().moveSpeed;
        super.draw(this.img,
            this.srcX,this.srcY,
            this.srcW,this.srcH,
            this.x,this.y,
            this.width,this.height);
    }
}