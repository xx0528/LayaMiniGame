import Ob_XYXZS_jPool from "./ObjPool";
import IO_XYXZS_bj from "./IObj";

class ObjE_XYXZS_xample extends Laya.Script
{
    public t_XYXZS_est : string = "";

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
        this.t_XYXZS_est = "";
    }
    OP_OnClear() : void
    {
        console.log("我在对象池中被清理了")
    }
}
export default class ObjP_XYXZS_oolExample extends Laya.Script
{    

    protected readonly _p_XYXZS_ool : Ob_XYXZS_jPool = new Ob_XYXZS_jPool();//实例化一个对象池
    constructor() { super(); }
    
    onEnable(): void 
    {
        var obj = new ObjE_XYXZS_xample();//实例化一个对象
        obj.t_XYXZS_est = "测试";//使用这个对象
        this._p_XYXZS_ool.rec_XYXZS_over(obj);//回收对象,会调用对象的 OP_Reset 函数
        obj = this._p_XYXZS_ool.get("testObj") as ObjE_XYXZS_xample;//使用key从对象池中获取对象，会调用返回对象的 OP_Init 函数
        this._p_XYXZS_ool.rec_XYXZS_over(obj);//回收对象
        this._p_XYXZS_ool.cl_XYXZS_ear();//清空对象池，对象池中的所有对象将被调用 OP_OnClear
        this._p_XYXZS_ool.setCr_XYXZS_eateFunc(this,this.create_XYXZS_ObjExample);//给对象池赋值一个创建函数
        var obj2 : ObjE_XYXZS_xample =  this._p_XYXZS_ool.get("testObj") as ObjE_XYXZS_xample;//从已经为空的对象池中获取对象，因为我们已在上面一句代码中赋值了创建函数，所以对象池回调用创建函数实例化一个对象，并返回
        obj2.t_XYXZS_est = "第二个对象";//使用对象
        this._p_XYXZS_ool.rec_XYXZS_over(obj2);//回收对象
    }

    onDisable(): void 
    {

    }

    protected create_XYXZS_ObjExample(key : any) : ObjE_XYXZS_xample
    {
        if(key == "testObj")
        {
            return new ObjE_XYXZS_xample();
        }
        return null;
    }
}