/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DataStore_js__ = __webpack_require__(1);
//精灵的基类，负责初始化精灵加载的资源和大小以及位置



class Sprite {
    //es6特性，可以给参数赋予默认值，不至于让程序崩溃
    constructor(img = null, srcX = 0, srcY = 0, srcW = 0, srcH = 0, x = 0, y = 0, width = 0, height = 0) {
        this.dataStore = __WEBPACK_IMPORTED_MODULE_0__DataStore_js__["a" /* DataStore */].getInstance();
        this.ctx = this.dataStore.ctx;
        this.img = img;
        this.srcX = srcX;
        this.srcY = srcY;
        this.srcW = srcW;
        this.srcH = srcH;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    static getImage(key) {
        return __WEBPACK_IMPORTED_MODULE_0__DataStore_js__["a" /* DataStore */].getInstance().res.get(key);
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
    draw(img = this.img, srcX = this.srcX, srcY = this.srcY, srcW = this.srcW, srcH = this.srcH, x = this.x, y = this.y, width = this.width, height = this.height) {
        // canvas的drawImage负责把我们的位图资源进行剪裁，
        // 然后缩放，放置到我们的画布上，并且进行渲染
        this.ctx.drawImage(img, srcX, srcY, srcW, srcH, x, y, width, height);
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Sprite;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
//变量缓存器，方便我们在不同的类中访问和修改变量
//所有的数据关联就放到datastore里面
//数据放在这里进行统一的管理
//不管在任何类里面，只要取到dataStore这个对象，就可以取到整个全局的所有变量
class DataStore {
    //全局只有一个，所以只用创建个单例
    static getInstance() {
        if (!DataStore.Instance) {
            DataStore.Instance = new DataStore();
        }
        return DataStore.Instance;
    }
    constructor() {
        this.map = new Map();
    }
    //return 对象本身
    //为什么要这么做呢，
    // 我们在操作dataStore的时候，连续进行put的时候，
    //我们就不需要Instance.put Instance.put....我们就可以链式的方式去操作他
    //链式操作经常被用到
    put(key, value) {
        if (typeof value === 'function') {
            value = new value();
        }
        this.map.set(key, value);
        return this;
    }
    get(key) {
        return this.map.get(key);
    }
    destroy() {
        for (let value of this.map.values()) {
            value = null;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DataStore;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_DataStore_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__runtime_UpPencil_js__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__runtime_DownPencil_js__ = __webpack_require__(12);
//导演类，控制游戏的逻辑
// 因为一个剧场里面只允许有一个导演，因为导演多了会打架的
//放置游戏的地方
//导演同时管理所有的逻辑、运行、销毁、创建





class Director {

    constructor() {
        this.dataStore = __WEBPACK_IMPORTED_MODULE_0__base_DataStore_js__["a" /* DataStore */].getInstance();
        this.moveSpeed = 2;
        // this.h=window.innerHeight;
    }

    static getInstance() {
        //写.Instance的时候已经覆盖到director的原型链中了
        if (!Director.Instance) {
            Director.Instance = new Director();
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

    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        //随机数是假随机数
        const top = minTop + Math.random() * (maxTop - minTop);
        //把高度确定了，就要创建每一个铅笔，我们需要有个值去存储他们，
        // 这值数据类型最好就是数组，回到main.js，从dataStore中put一个pencils数组

        this.dataStore.get('pencils').push(new __WEBPACK_IMPORTED_MODULE_1__runtime_UpPencil_js__["a" /* UpPencil */](top));
        this.dataStore.get('pencils').push(new __WEBPACK_IMPORTED_MODULE_2__runtime_DownPencil_js__["a" /* DownPencil */](top));
    }

    birdsEvent() {
        for (let i = 0; i <= 2; i++) {
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
        }
        this.dataStore.get('birds').time = 0;
    }

    //判断小鸟是否和铅笔撞击
    static isStrike(birdsBorder, pencilBorder) {
        let s = true;
        if (birdsBorder.top > pencilBorder.bottom || birdsBorder.bottom < pencilBorder.top || birdsBorder.left > pencilBorder.right || birdsBorder.right < pencilBorder.left) {
            s = false;
        }
        return s;
    }

    //判断小鸟是否撞击地板和铅笔
    check() {
        const birds = this.dataStore.get('birds');
        const land = this.dataStore.get('land');
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');
        //地板的撞击判断
        if (birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            console.log('撞击地面啦');
            this.isGameOver = true;
            return;
        }
        //创建小鸟和铅笔的边框模型
        const birdsBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };

        const length = pencils.length;
        for (let i = 0; i < length; i++) {
            const pencil = pencils[i];
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };
            if (Director.isStrike(birdsBorder, pencilBorder)) {
                console.log('装到水管啦');
                this.isGameOver = true;
                return;
            }
        }

        //加分逻辑
        if (birds.birdsX[0] > pencils[0].x + pencils[0].width && score.isScore) {
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    //既然所有逻辑都要放在director里面，我们就不应该在main类里面进行逻辑的操作，
    //所以在这里创建run方法，游戏运行的方法
    run() {
        this.check();
        //run想要正常执行，首先要满足的条件就是游戏是没有结束的

        if (this.isGameOver === false) {
            //把背景精灵提出来因为他是不变的
            this.dataStore.get('background').draw();

            const pencils = this.dataStore.get('pencils');
            //把第一个和第二组的铅笔全部推出去
            if (pencils[0].x + pencils[0].width <= 0 && pencils.length === 4) {
                //把数组第一个推出去，并且把数组个数减一
                pencils.shift();
                pencils.shift();
                this.dataStore.get('score').isScore = true;
            }

            if (pencils[0].x <= (window.innerWidth - pencils[0].width) / 2 && pencils.length === 2) {
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
            let timer = requestAnimationFrame(() => this.run());
            this.dataStore.put('time', timer);
        } else {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Director;


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Director_js__ = __webpack_require__(2);



class Pencils extends __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__["a" /* Sprite */] {
    constructor(img, top) {
        super(img, 0, 0, img.width, img.height,
        //刚好在右侧看不到的位置
        window.innerWidth, 0, img.width, img.height);
        this.top = top;
    }
    draw() {
        this.x = this.x - __WEBPACK_IMPORTED_MODULE_1__Director_js__["a" /* Director */].getInstance().moveSpeed;
        super.draw(this.img, this.srcX, this.srcY, this.srcW, this.srcH, this.x, this.y, this.width, this.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Pencils;


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__js_base_ResourceLoader_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__js_base_DataStore_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__js_runtime_Background_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__js_Director_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__js_runtime_Land_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__js_player_Birds_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__js_player_StartButton_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__js_player_Score_js__ = __webpack_require__(9);
//初始化整个游戏的精灵，作为游戏开始的入口
//初始化精灵的地方










class Main {
    constructor() {
        this.canvas = document.getElementById('game_canvas');
        //获得html中的canvas元素
        //使用this是方便以后使用这个变量，
        // 这样canvas和context就是整个类的变量，
        // 在任何的方法中都可以去使用它们
        this.ctx = this.canvas.getContext('2d');

        //通过这样简单工厂的方法，就可以控制new这个过程，
        // 包括传参，也可以通过这样的方式
        const loader = __WEBPACK_IMPORTED_MODULE_0__js_base_ResourceLoader_js__["a" /* ResourceLoader */].create();
        this.dataStore = __WEBPACK_IMPORTED_MODULE_1__js_base_DataStore_js__["a" /* DataStore */].getInstance();
        this.director = __WEBPACK_IMPORTED_MODULE_3__js_Director_js__["a" /* Director */].getInstance();

        //普通函数this一般指向在运行的作用域
        //使用箭头函数会让this绑到定义时所在的作用域
        //所以下面的this指向的是Main,而loader里面的this还是指向ResourceLoader
        loader.onLoaded(map => this.onResourceFirstLoaded(map));
    }
    //单独写一个方法给resourceLoader的onloaded
    // 只用资源第一次加载的时候，毕竟重新开始游戏的时候不需要重新加载资源，
    // 只需要重新加载逻辑就好了
    //因此资源只需加载一次
    onResourceFirstLoaded(map) {
        //给dataStore赋上用于不变的值
        //ctx和res，为什么不用put呢？
        //原因因为游戏结束的时候，background、birds、land精灵要一一进行销毁，
        //而有些变量时不需要销毁的，比如context(ctx)、resource(res)，
        //ctx，res是需要长期保留在内存中的，这时候呢我们把它们放在单例的类变量当中
        //使他能够用于保存，即放到instance的原型链中的
        //那些随着游戏一轮又一轮的进行，不断的销毁和创建的才放到dataStore的map中
        this.dataStore.ctx = this.ctx;
        this.dataStore.res = map;
        this.init();
    }

    // 既然是初始化过程，我们不妨直接写个init方法，把初始化的精灵放进来
    init() {
        //统筹配置：一个游戏的开始与结束需要一个标志性的变量来控制，
        // 说白了就是拿变量来判断游戏是不是game over了
        //判断游戏是否结束了，这个游戏自然是导演的职责，
        //所以把它付给了导演的单例变量

        //当小鸟触发了某些条件，游戏要结束的时候，
        // 我们只需要控制director的isGameOver这个值的变化，
        // 我们就能控制run方法，是否能不断的进行刷新
        //也就能控制cancelAnimationFrame能够执行，
        //所以canvas是否能够继续渲染它的图像，也就被这一个变量控制了
        this.director.isGameOver = false;

        // this.pencils=[]
        //上面写的好处就体现出来了，我们可以如下一层一层put的方式放
        this.dataStore.put('pencils', []).put('background', __WEBPACK_IMPORTED_MODULE_2__js_runtime_Background_js__["a" /* Background */]).put('land', __WEBPACK_IMPORTED_MODULE_4__js_runtime_Land_js__["a" /* Land */]).put('birds', __WEBPACK_IMPORTED_MODULE_5__js_player_Birds_js__["a" /* Birds */]).put('startButton', __WEBPACK_IMPORTED_MODULE_6__js_player_StartButton_js__["a" /* StartButton */]).put('score', __WEBPACK_IMPORTED_MODULE_7__js_player_Score_js__["a" /* Score */]);
        // .put('pencils',this.pencils)

        this.registerEvent();

        //在创建animationFrame逻辑之前，我们需要先创建第一组上下的铅笔，
        // 所要我们要在这里触发下面这个事件
        this.director.createPencil();

        //当初始化结束后，只需要一下就可以开始渲染了
        this.director.run();
    }

    //添加事件属于初始化操作，初始化需要在main里面进行
    registerEvent() {
        //我们使用箭头函数，因为这样的话this是指向我们的外部，也就是main类
        this.canvas.addEventListener('touchstart', e => {
            //屏蔽掉js的事件冒泡
            e.preventDefault();
            if (this.director.isGameOver) {
                console.log('游戏开始');
                this.init();
            } else {
                this.director.birdsEvent();
            }
        });
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = Main;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Main_js__ = __webpack_require__(4);

new __WEBPACK_IMPORTED_MODULE_0__Main_js__["a" /* Main */]();

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Resources_js__ = __webpack_require__(7);
//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染


class ResourceLoader {
    constructor() {
        //构造器，目的是创建资源路径的map，然后将值从图片路径转换城Image对象
        this.map = new Map(__WEBPACK_IMPORTED_MODULE_0__Resources_js__["a" /* Resources */]);
        for (let [key, value] of this.map) {
            let image = new Image();
            image.src = value;
            this.map.set(key, image);
        }
    }

    onLoaded(callback) {
        //加载canvas前确保图片加载完成后再加载（即加载完图片后用回调函数）
        let count = 0;
        for (let value of this.map.values()) {
            value.onload = () => {
                count++;
                if (count >= this.map.size) {
                    callback(this.map);
                }
            };
        }
    }

    static create() {
        //让其他类直接调用create方法创建ResourceLoader
        return new ResourceLoader();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ResourceLoader;


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const Resources = [['background', 'res/background.png'], ['birds', 'res/birds.png'], ['land', 'res/land.png'], ['pencilUp', 'res/pie_up.png'], ['pencilDown', 'res/pie_down.png'], ['startButton', 'res/start_button.png']];
/* harmony export (immutable) */ __webpack_exports__["a"] = Resources;


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__ = __webpack_require__(0);
//小鸟类
//是循环三只小鸟
//其实是循环渲染图片三部分


class Birds extends __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__["a" /* Sprite */] {

    constructor() {
        const img = __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__["a" /* Sprite */].getImage('birds');
        super(img, 0, 0, img.width, img.height, window.innerWidth / 3, 0, img.width, img.height);

        //小鸟的三种状态需要一个数组去存储
        //小鸟的宽是34，高是24，上下边距是10，左右边距是9
        //有了这些数据，我们就可以定义存储的数据下来的变量，
        // 我们需要每一只小鸟的x、y坐标，每一只鸟的宽高，
        // 每一组小鸟的所在坐标的组，和每一组小鸟所需要宽高的组
        this.clippingX = [9, 9 + 34 + 18, 9 + 34 + 18 + 34 + 18];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];

        // 将对外不可见的变量用const表示，const是会被优化的，性能会有一些些的提升
        const birdX = window.innerWidth / 4;
        this.birdsX = [birdX, birdX, birdX];
        const birdY = window.innerHeight / 2;
        this.birdsY = [birdY, birdY, birdY];
        const birdWidth = 34;
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        const birdHeight = 24;
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        //我们需要再加个东西，小鸟上下飞动其实他变的是什么？
        // 他变的其实是每一只小鸟的y坐标，别的数据都没有变化，即变得是birdY
        this.y = [birdY, birdY, birdY];
        // 我们小鸟处于第几只，所以在这里我们需要几个变量
        this.index = 0;
        this.count = 0; //用来循环小鸟个数的
        this.time = 0;
    }

    draw() {
        //切换三只小鸟的速度
        const speed = 0.6;
        this.count = this.count + speed;
        //0,1,2
        if (this.index >= 2) {
            this.count = 0;
        }
        // Math.floor()相当于减速器的作用，
        //其实很多动画的原理都是这样的
        this.index = Math.floor(this.count);

        const g = 0.98 / 2.4;
        const offsetY = g * this.time * (this.time - 30) / 2;
        this.time++;

        for (let i = 0; i <= 2; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }

        super.draw(this.img, this.clippingX[this.index], this.clippingY[this.index], this.clippingWidth[this.index], this.clippingHeight[this.index], this.birdsX[this.index], this.birdsY[this.index], this.birdsWidth[this.index], this.birdsHeight[this.index]);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Birds;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_DataStore_js__ = __webpack_require__(1);


class Score {
    constructor() {
        this.ctx = __WEBPACK_IMPORTED_MODULE_0__base_DataStore_js__["a" /* DataStore */].getInstance().ctx;
        this.scoreNumber = 0;
        //因为canvas刷新的很快，所以需要一个变量控制加分，只加一次
        this.isScore = true;
    }

    draw() {
        this.ctx.font = '25px Arial';
        this.ctx.fillStyle = '#fb1dff';
        this.ctx.fillText(this.scoreNumber, window.innerWidth / 2, window.innerHeight / 18, 1000);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Score;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__ = __webpack_require__(0);


class StartButton extends __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__["a" /* Sprite */] {
    constructor() {
        const img = __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__["a" /* Sprite */].getImage('startButton');
        super(img, 0, 0, img.width, img.height, (window.innerWidth - img.width) / 2, (window.innerHeight - img.height) / 2.5, img.width, img.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = StartButton;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__ = __webpack_require__(0);


class Background extends __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__["a" /* Sprite */] {
    constructor() {
        //super之上是不可以访问我们的类属性的，即super上面不能使用this
        //所以为了在super之前获得image，在sprite里面再添加一个方法

        //既然super之上不能访问类属性，那我们就变通，使用const
        //下面右边可以写成Background.getImage（'background'）,
        //因为Background继承了父类Sprite，
        // 所以Background其实也拥有getImage（'key'）这个静态方法，
        //这里为了统一，用Sprite
        const image = __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__["a" /* Sprite */].getImage('background');
        super(image, 0, 0, image.width, image.height, 0, 0, window.innerWidth, window.innerHeight);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Background;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pencils_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_Sprite_js__ = __webpack_require__(0);



class DownPencil extends __WEBPACK_IMPORTED_MODULE_0__Pencils_js__["a" /* Pencils */] {
    constructor(top) {
        const img = __WEBPACK_IMPORTED_MODULE_1__base_Sprite_js__["a" /* Sprite */].getImage('pencilDown');
        super(img, top);
    }

    draw() {
        let gap = window.innerHeight / 5;
        this.y = this.top + gap;
        super.draw();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DownPencil;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Director_js__ = __webpack_require__(2);



class Land extends __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__["a" /* Sprite */] {

    constructor() {

        const img = __WEBPACK_IMPORTED_MODULE_0__base_Sprite_js__["a" /* Sprite */].getImage('land');
        super(img, 0, 0, img.width, img.height, 0, window.innerHeight - img.height, img.width, img.height);
        //我们需要加两个参数，因为要让land左右来回移动的话，要设置水平偏移量
        //地板的水平变化坐标
        this.landX = 0;
        //地板的移动速度
        this.landSpeed = __WEBPACK_IMPORTED_MODULE_1__Director_js__["a" /* Director */].getInstance().moveSpeed;
    }

    draw() {
        this.landX = this.landX + this.landSpeed;
        if (this.landX >= this.img.width - window.innerWidth) {
            this.landX = 0;
        }
        super.draw(this.img, 0, 0, this.srcW, this.srcH, -this.landX, this.y, this.width, this.height);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Land;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Pencils_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__base_Sprite_js__ = __webpack_require__(0);



class UpPencil extends __WEBPACK_IMPORTED_MODULE_0__Pencils_js__["a" /* Pencils */] {
    constructor(top) {
        const img = __WEBPACK_IMPORTED_MODULE_1__base_Sprite_js__["a" /* Sprite */].getImage('pencilUp');
        super(img, top);
    }

    draw() {
        this.y = this.top - this.height;
        super.draw();
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UpPencil;


/***/ })
/******/ ]);