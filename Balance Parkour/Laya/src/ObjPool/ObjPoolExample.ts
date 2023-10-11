import Obj_tippy_Pool from "./ObjPool";
import I_tippy_Obj from "./IObj";

class Obj_tippy_Example extends Laya.Script
{
    public test : string = "";

    //实现接口IObj中所有的函数，就代表实现了这个接口
    OP_Key() : any
    {
        return "testObj";//通过函数 OP_Key 返回你所定义的key，key是用来标识这个对象的类型
    }
    OP_Init() : void
    {

    }
    OP_Reset() : void
    {
        this.test = "";
    }
    OP_OnClear() : void
    {
        console.log("我在对象池中被清理了")
    }
}
export default class ObjPool_tippy_Example extends Laya.Script
{    

    protected readonly _pool : Obj_tippy_Pool = new Obj_tippy_Pool();//实例化一个对象池
    constructor() { super(); }
    
    onEnable(): void 
    {
        var obj = new Obj_tippy_Example();//实例化一个对象
        obj.test = "测试";//使用这个对象
        this._pool.re_tippy_cover(obj);//回收对象,会调用对象的 OP_Reset 函数
        obj = this._pool.get("testObj") as Obj_tippy_Example;//使用key从对象池中获取对象，会调用返回对象的 OP_Init 函数
        this._pool.re_tippy_cover(obj);//回收对象
        this._pool.cl_tippy_ear();//清空对象池，对象池中的所有对象将被调用 OP_OnClear
        this._pool.setCreateFunc(this,this.createObjExample);//给对象池赋值一个创建函数
        var obj2 : Obj_tippy_Example =  this._pool.get("testObj") as Obj_tippy_Example;//从已经为空的对象池中获取对象，因为我们已在上面一句代码中赋值了创建函数，所以对象池回调用创建函数实例化一个对象，并返回
        obj2.test = "第二个对象";//使用对象
        this._pool.re_tippy_cover(obj2);//回收对象
    }

    onDisable(): void 
    {

    }

    protected createObjExample(key : any) : Obj_tippy_Example
    {
        if(key == "testObj")
        {
            return new Obj_tippy_Example();
        }
        return null;
    }
}