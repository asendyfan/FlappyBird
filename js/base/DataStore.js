//变量缓存器，方便我们在不同的类中访问和修改变量
//所有的数据关联就放到datastore里面
//数据放在这里进行统一的管理
//不管在任何类里面，只要取到dataStore这个对象，就可以取到整个全局的所有变量
export class DataStore{
    //全局只有一个，所以只用创建个单例
    static getInstance(){
        if(!DataStore.Instance){
            DataStore.Instance=new DataStore()
        }
        return DataStore.Instance;
    }
    constructor(){
        this.map=new Map();
    }
    //return 对象本身
    //为什么要这么做呢，
    // 我们在操作dataStore的时候，连续进行put的时候，
    //我们就不需要Instance.put Instance.put....我们就可以链式的方式去操作他
    //链式操作经常被用到
    put(key,value){
        if(typeof value==='function'){
            value=new value();
        }
        this.map.set(key,value);
        return this
    }
    get(key){
        return this.map.get(key);
    }
    destroy(){
        for(let value of this.map.values()){
            value=null;
        }
    }
}