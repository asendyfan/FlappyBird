import {Pencils} from "./Pencils.js";
import {Sprite} from "../base/Sprite.js";

export class UpPencil extends  Pencils{
    constructor(top){
        const img=Sprite.getImage('pencilUp');
        super(img,top);
    }

    draw(){
        this.y=this.top-this.height;
        super.draw();
    }
}