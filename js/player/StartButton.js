import {Sprite} from "../base/Sprite.js";

export class StartButton extends Sprite{
    constructor(){
        const img=Sprite.getImage('startButton');
        super(img,
            0,0,
            img.width,img.height,
            (window.innerWidth-img.width)/2,
            (window.innerHeight-img.height)/2.5,
            img.width,img.height);
    }
}