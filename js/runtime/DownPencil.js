import {Pencils} from "./Pencils.js";
import {Sprite} from "../base/Sprite.js";

export class DownPencil extends Pencils{
    constructor(top){
        const img=Sprite.getImage('pencilDown');
        super(img,top);
    }

    draw(){
        let gap=window.innerHeight/5;
        this.y=this.top+gap;
        super.draw();
    }
}