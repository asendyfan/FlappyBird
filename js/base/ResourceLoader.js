//资源文件加载器，确保canvas在图片资源加载完成后才进行渲染
import {Resources} from "./Resources.js";

export class ResourceLoader{
    constructor(){//构造器，目的是创建资源路径的map，然后将值从图片路径转换城Image对象
        this.map=new Map(Resources);
        for(let [key,value] of this.map){
            let image =new Image();
            image.src=value;
            this.map.set(key, image);
        }
    }

    onLoaded(callback){//加载canvas前确保图片加载完成后再加载（即加载完图片后用回调函数）
        let count = 0;
        for(let value of this.map.values()){
            value.onload=()=>{
                count++;
                if(count>=this.map.size){
                    callback(this.map);
                }
            }
        }
    }

    static create(){  //让其他类直接调用create方法创建ResourceLoader
        return new ResourceLoader();
    }
}
