//导演类，控制游戏的逻辑
// 因为一个剧场里面只允许有一个导演，因为导演多了会打架的
//放置游戏的地方
//导演同时管理所有的逻辑、运行、销毁、创建
import {DataStore} from "./base/DataStore.js";

import {UpPencil} from "./runtime/UpPencil.js";
import {DownPencil} from "./runtime/DownPencil.js";

export class Director{

    constructor(){
        this.dataStore=DataStore.getInstance();
        this.moveSpeed=2;
        // this.h=window.innerHeight;

    }

    static getInstance(){
        //写.Instance的时候已经覆盖到director的原型链中了
        if(!Director.Instance){
            Director.Instance=new Director();
        }
        return Director.Instance;
    }

    // pencilMove(){
    //     this.top=this.h/8+this.h*0.38*Math.random();
    //     this.pencils=this.dataStore.get('pencils');
    //     // this.adds=false;
    //     if(this.pencils.length===0||this.adds){
    //         this.pencils.push(new UpPencil(this.top));
    //         this.pencils.push(new DownPencil(this.top));
    //         // this.adds=false;
    //     }
    //     // if(this.pencils[0].x<(window.innerWidth-this.pencils[0].width)*0.5){
    //     //     this.adds=true
    //     // }
    //
    //     if(this.pencils[0].x<-this.pencils[0].width){
    //         this.pencils.shift();
    //         this.pencils.shift();
    //         for(let p of this.pencils) {
    //             p.x=window.innerWidth;
    //         }
    //     }else{
    //         for(let p of this.pencils){
    //             console.log(this.pencils.length);
    //             p.draw();
    //             console.log('iiiiiii  '+this.pencils.length);
    //         }
    //     }
    // }

    createPencil(){
        const minTop=window.innerHeight/8;
        const maxTop=window.innerHeight/2;
        //随机数是假随机数
        const top=minTop+Math.random()*(maxTop-minTop);
        //把高度确定了，就要创建每一个铅笔，我们需要有个值去存储他们，
        // 这值数据类型最好就是数组，回到main.js，从dataStore中put一个pencils数组

        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));

    }

    birdsEvent(){
        for(let i=0;i<=2;i++){
            this.dataStore.get('birds').y[i]=
                this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time=0;
    }

    //判断小鸟是否和铅笔撞击
    static isStrike(birdsBorder,pencilBorder){
        let s=true;
        if(birdsBorder.top>pencilBorder.bottom||
                birdsBorder.bottom<pencilBorder.top||
                    birdsBorder.left>pencilBorder.right||
                        birdsBorder.right<pencilBorder.left){
            s=false;
        }
        return s;
    }


    //判断小鸟是否撞击地板和铅笔
    check(){
        const birds=this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils=this.dataStore.get('pencils');
        const score=this.dataStore.get('score');
        //地板的撞击判断
        if(birds.birdsY[0]+birds.birdsHeight[0]>=land.y){
            console.log('撞击地面啦');
            this.isGameOver=true;
            return;
        }
        //创建小鸟和铅笔的边框模型
        const birdsBorder={
            top:birds.birdsY[0],
            bottom:birds.birdsY[0]+birds.birdsHeight[0],
            left:birds.birdsX[0],
            right:birds.birdsX[0]+birds.birdsWidth[0]
        };


        const length=pencils.length;
        for(let i=0;i<length;i++){
            const pencil=pencils[i];
            const pencilBorder={
                top:pencil.y,
                bottom:pencil.y+pencil.height,
                left:pencil.x,
                right:pencil.x+pencil.width
            };
            if(Director.isStrike(birdsBorder,pencilBorder)){
                console.log('装到水管啦');
                this.isGameOver=true;
                return
            }
        }

        //加分逻辑
        if(birds.birdsX[0]>pencils[0].x+pencils[0].width&&score.isScore){
            score.isScore=false;
            score.scoreNumber++;
        }


    }



    //既然所有逻辑都要放在director里面，我们就不应该在main类里面进行逻辑的操作，
    //所以在这里创建run方法，游戏运行的方法
    run(){
        this.check();
        //run想要正常执行，首先要满足的条件就是游戏是没有结束的

        if(this.isGameOver===false){
            //把背景精灵提出来因为他是不变的
            this.dataStore.get('background').draw();

            const pencils=this.dataStore.get('pencils');
            //把第一个和第二组的铅笔全部推出去
            if(pencils[0].x+pencils[0].width<=0&&pencils.length===4){
                //把数组第一个推出去，并且把数组个数减一
                pencils.shift();
                pencils.shift();
                this.dataStore.get('score').isScore=true;
            }

            if(pencils[0].x<=(window.innerWidth-pencils[0].width)/2&&
                pencils.length===2){
                this.createPencil();
            }
            //游戏开发真正难的并不是它的ui绘制，
            // 而是他中间奇奇怪怪的逻辑
            //这个对算法与逻辑有很大的提升

            // this.pencilMove();
            //js自带的forEach方法有三个参数，第一个参数是我们每个item的值value，
            // 第二个参数组的角标，即index，第三个参数是就是数组本书array
            this.dataStore.get('pencils').forEach(function (value) {
                value.draw();
            });
            this.dataStore.get('land').draw();

            this.dataStore.get('score').draw();

            this.dataStore.get('birds').draw();


            //requestAnimationFrame这个方法是全局的，
            // 此方法会根据浏览器的帧率来进行动态的调整，
            //他能保证我们有足够的性能，
            //一般我们动画制作的话，都会用到这个方法。
            //这里用箭头函数是保证this永远指向对外这个类的
            //而并不是指向其内部的function。

            //添加timer这个变量（值）的原因：
            //我们在结束这个游戏的时候可以终止掉它，
            //因此可以把它存在datastore里面.
            //这样就保证了浏览器没有额外的线程去执行这个动画了
            let timer=requestAnimationFrame(()=>this.run());
            this.dataStore.put('time',timer);
        }else{
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();
            cancelAnimationFrame(this.dataStore.get('time'));
            //这个操作是吧所有精灵置空，保证内存是清零的，
            // 这样对性能或内存方面的一种释放，
            //java不考虑内存的话，服务端可能会爆掉
            this.dataStore.destroy();

        }
    }
}