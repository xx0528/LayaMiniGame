import IO_wcjtn_bj from "./IObj";

export default class Obj_wcjtn_Pool 
{
    protected readonly _pool_wcjtn_ : Array<IO_wcjtn_bj> = new Array<IO_wcjtn_bj>();

    protected _create_wcjtn_Caller : any = null;
    protected _create_wcjtn_Func : Function = null;

    //从对象池中获取对象,如果不传入key，则直接返回池中最后一个对象
    //如果对象池为空，并没有 create 函数，则返回 null
    //如果对象池为空，有 create 函数，则调用  create 实例化对象并返回。
    public get_wcjtn_(key? : any) : IO_wcjtn_bj
    {
        var obj : IO_wcjtn_bj = null;
        if(null == key)
        {
            obj = this._pool_wcjtn_.pop();
        }
        else
        {
            for(var i=0;i < this._pool_wcjtn_.length;++i)
            {
                if(this._pool_wcjtn_[i].OP_Key() == key)
                {
                    obj = this._pool_wcjtn_[i];
                    this._pool_wcjtn_.splice(i,1);
                    break;
                }
            }
        }

        if(obj)
        {
            obj.OP_Init();
        }
        else
        {
            if(this._create_wcjtn_Func)
            {
                obj = this._create_wcjtn_Func.call(this._create_wcjtn_Caller,[key])
                obj.OP_Init();
            }
        }
        return obj;
    }

    //回收对象
    public recover_wcjtn_(o : IO_wcjtn_bj)
    {
        o.OP_Reset();
        for(var i=0;i < this._pool_wcjtn_.length;++i)
        {
            if(this._pool_wcjtn_[i] == o)
            {
                return;
            }
        }
        this._pool_wcjtn_.push(o);
    }

    //清空对象池
    public clear_wcjtn_()
    {
        for(var i=0;i < this._pool_wcjtn_.length;++i)
        {
            this._pool_wcjtn_[i].OP_OnClear();//调用对象的清理函数，释放对象自身维护的资源
        }
        this._pool_wcjtn_.splice(0);
    }

    public set_wcjtn_Create_wcjtn_Func(caller : any,createFunc : Function)
    {
        this._create_wcjtn_Caller = caller;
        this._create_wcjtn_Func = createFunc;
    }
}