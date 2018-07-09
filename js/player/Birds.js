//小鸟类
//是循环三只小鸟
//其实是循环渲染图片三部分
import {Sprite} from "../base/Sprite.js";

export class Birds extends Sprite{

    constructor(){
        const img=Sprite.getImage('birds');
        super(img,
            0,0,
            img.width,img.height,
            window.innerWidth/3,0,
            img.width,img.height);

        //小鸟的三种状态需要一个数组去存储
        //小鸟的宽是34，高是24，上下边距是10，左右边距是9
        //有了这些数据，我们就可以定义存储的数据下来的变量，
        // 我们需要每一只小鸟的x、y坐标，每一只鸟的宽高，
        // 每一组小鸟的所在坐标的组，和每一组小鸟所需要宽高的组
        this.clippingX=[
            9,
            9+34+18,
            9+34+18+34+18];
        this.clippingY=[10,10,10];
        this.clippingWidth=[34,34,34];
        this.clippingHeight=[24,24,24];


        // 将对外不可见的变量用const表示，const是会被优化的，性能会有一些些的提升
        const birdX=window.innerWidth/4;
        this.birdsX=[birdX,birdX,birdX];
        const birdY=window.innerHeight/2;
        this.birdsY=[birdY,birdY,birdY];
        const birdWidth=34;
        this.birdsWidth=[birdWidth,birdWidth,birdWidth];
        const birdHeight=24;
        this.birdsHeight=[birdHeight,birdHeight,birdHeight];
        //我们需要再加个东西，小鸟上下飞动其实他变的是什么？
        // 他变的其实是每一只小鸟的y坐标，别的数据都没有变化，即变得是birdY
        this.y=[birdY,birdY,birdY];
        // 我们小鸟处于第几只，所以在这里我们需要几个变量
        this.index=0;
        this.count=0;//用来循环小鸟个数的
        this.time=0;

    }



    draw(){
        //切换三只小鸟的速度
        const speed=0.6;
        this.count=this.count+speed;
        //0,1,2
        if(this.index>=2){
            this.count=0;
        }
        // Math.floor()相当于减速器的作用，
        //其实很多动画的原理都是这样的
        this.index=Math.floor(this.count);

        const g=0.98/2.4
        const offsetY=(g*this.time*(this.time-30))/2;
        this.time++;

        for(let i=0;i<=2;i++){
            this.birdsY[i]=this.y[i]+offsetY;
        }


        super.draw(this.img,
                    this.clippingX[this.index],this.clippingY[this.index],
                    this.clippingWidth[this.index],this.clippingHeight[this.index],
                    this.birdsX[this.index],this.birdsY[this.index],
                    this.birdsWidth[this.index],this.birdsHeight[this.index]);
    }
}