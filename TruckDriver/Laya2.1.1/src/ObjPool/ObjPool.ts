import I_ppxhc_Obj from "./IObj";

export default class Obj_ppxhc_Pool 
{
    protected readonly _ppxhc_pool : Array<I_ppxhc_Obj> = new Array<I_ppxhc_Obj>();

    protected _create_ppxhc_Caller : any = null;
    protected _create_ppxhc_Func : Function = null;

    //从对象池中获取对象,如果不传入key，则直接返回池中最后一个对象
    //如果对象池为空，并没有 create 函数，则返回 null
    //如果对象池为空，有 create 函数，则调用  create 实例化对象并返回。
    public get(key? : any) : I_ppxhc_Obj
    {
        var obj : I_ppxhc_Obj = null;
        if(null == key)
        {
            obj = this._ppxhc_pool.pop();
        }
        else
        {
            for(var i=0;i < this._ppxhc_pool.length;++i)
            {
                if(this._ppxhc_pool[i].OP_ppxhc_Key() == key)
                {
                    obj = this._ppxhc_pool[i];
                    this._ppxhc_pool.splice(i,1);
                    break;
                }
            }
        }

        if(obj)
        {
            obj.OP_ppxhc_Init();
        }
        else
        {
            if(this._create_ppxhc_Func)
            {
                obj = this._create_ppxhc_Func.call(this._create_ppxhc_Caller,[key])
                obj.OP_ppxhc_Init();
            }
        }
        return obj;
    }

    //回收对象
    public recover(o : I_ppxhc_Obj)
    {
        o.OP_ppxhc_Reset();
        for(var i=0;i < this._ppxhc_pool.length;++i)
        {
            if(this._ppxhc_pool[i] == o)
            {
                return;
            }
        }
        this._ppxhc_pool.push(o);
    }

    //清空对象池
    public clear()
    {
        for(var i=0;i < this._ppxhc_pool.length;++i)
        {
            this._ppxhc_pool[i].OP_ppxhc_OnClear();//调用对象的清理函数，释放对象自身维护的资源
        }
        this._ppxhc_pool.splice(0);
    }

    public setCreate_ppxhc_Func(caller : any,createFunc : Function)
    {
        this._create_ppxhc_Caller = caller;
        this._create_ppxhc_Func = createFunc;
    }
}