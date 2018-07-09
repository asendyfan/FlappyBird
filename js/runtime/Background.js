import {Sprite} from "../base/Sprite.js";

export class Background extends Sprite{
    constructor(){
        //super之上是不可以访问我们的类属性的，即super上面不能使用this
        //所以为了在super之前获得image，在sprite里面再添加一个方法

        //既然super之上不能访问类属性，那我们就变通，使用const
        //下面右边可以写成Background.getImage（'background'）,
        //因为Background继承了父类Sprite，
        // 所以Background其实也拥有getImage（'key'）这个静态方法，
        //这里为了统一，用Sprite
        const image=Sprite.getImage('background');
        super(
            image,
            0,0,
            image.width,image.height,
            0,0,
            window.innerWidth,window.innerHeight
        );
    }
}