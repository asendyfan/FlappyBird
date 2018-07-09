//初始化整个游戏的精灵，作为游戏开始的入口
//初始化精灵的地方
import {ResourceLoader} from "./js/base/ResourceLoader.js";
import {DataStore} from "./js/base/DataStore.js";

import {Background} from "./js/runtime/Background.js";
import {Director} from "./js/Director.js";
import {Land} from "./js/runtime/Land.js";
import {Birds} from "./js/player/Birds.js";
import {StartButton} from "./js/player/StartButton.js";
import {Score} from "./js/player/Score.js";

export class Main {
    constructor() {
        this.canvas=document.getElementById('game_canvas');
        //获得html中的canvas元素
        //使用this是方便以后使用这个变量，
        // 这样canvas和context就是整个类的变量，
        // 在任何的方法中都可以去使用它们
        this.ctx=this.canvas.getContext('2d');

        //通过这样简单工厂的方法，就可以控制new这个过程，
        // 包括传参，也可以通过这样的方式
        const loader=ResourceLoader.create();
        this.dataStore=DataStore.getInstance();
        this.director=Director.getInstance();

        //普通函数this一般指向在运行的作用域
        //使用箭头函数会让this绑到定义时所在的作用域
        //所以下面的this指向的是Main,而loader里面的this还是指向ResourceLoader
        loader.onLoaded(map=>this.onResourceFirstLoaded(map))
    }
    //单独写一个方法给resourceLoader的onloaded
    // 只用资源第一次加载的时候，毕竟重新开始游戏的时候不需要重新加载资源，
    // 只需要重新加载逻辑就好了
    //因此资源只需加载一次
    onResourceFirstLoaded(map){
        //给dataStore赋上用于不变的值
        //ctx和res，为什么不用put呢？
        //原因因为游戏结束的时候，background、birds、land精灵要一一进行销毁，
        //而有些变量时不需要销毁的，比如context(ctx)、resource(res)，
        //ctx，res是需要长期保留在内存中的，这时候呢我们把它们放在单例的类变量当中
        //使他能够用于保存，即放到instance的原型链中的
        //那些随着游戏一轮又一轮的进行，不断的销毁和创建的才放到dataStore的map中
        this.dataStore.ctx=this.ctx;
        this.dataStore.res=map;
        this.init();
    }

    // 既然是初始化过程，我们不妨直接写个init方法，把初始化的精灵放进来
    init(){
        //统筹配置：一个游戏的开始与结束需要一个标志性的变量来控制，
        // 说白了就是拿变量来判断游戏是不是game over了
        //判断游戏是否结束了，这个游戏自然是导演的职责，
        //所以把它付给了导演的单例变量

        //当小鸟触发了某些条件，游戏要结束的时候，
        // 我们只需要控制director的isGameOver这个值的变化，
        // 我们就能控制run方法，是否能不断的进行刷新
        //也就能控制cancelAnimationFrame能够执行，
        //所以canvas是否能够继续渲染它的图像，也就被这一个变量控制了
        this.director.isGameOver=false;

        // this.pencils=[]
        //上面写的好处就体现出来了，我们可以如下一层一层put的方式放
        this.dataStore
            .put('pencils',[])
            .put('background', Background)
            .put('land',Land)
            .put('birds',Birds)
            .put('startButton',StartButton)
            .put('score',Score);
            // .put('pencils',this.pencils)

        this.registerEvent();

        //在创建animationFrame逻辑之前，我们需要先创建第一组上下的铅笔，
        // 所要我们要在这里触发下面这个事件
        this.director.createPencil();

        //当初始化结束后，只需要一下就可以开始渲染了
        this.director.run();
    }

    //添加事件属于初始化操作，初始化需要在main里面进行
    registerEvent(){
        //我们使用箭头函数，因为这样的话this是指向我们的外部，也就是main类
        this.canvas.addEventListener('touchstart',e=>{
            //屏蔽掉js的事件冒泡
            e.preventDefault();
            if(this.director.isGameOver){
                console.log('游戏开始');
                this.init();
            }else{
                this.director.birdsEvent();
            }

        })
    }

}











