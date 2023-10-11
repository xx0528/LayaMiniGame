import IObj from "./IObj";

export default class Obj_myqq_Pool 
{
    protected readonly _pool : Array<IObj> = new Array<IObj>();

    public create : Function = null;

    //从对象池中获取对象,如果不传入key，则直接返回池中最后一个对象
    //如果对象池为空，并没有 create 函数，则返回 null
    //如果对象池为空，有 create 函数，则调用  create 实例化对象并返回。
    public get(key? : any) : IObj
    {
        var obj : IObj = null;
        if(null == key)
        {
            obj = this._pool.pop();
        }
        else
        {
            for(var i=0;i < this._pool.length;++i)
            {
                if(this._pool[i].OP_Key() == key)
                {
                    obj = this._pool[i];
                    this._pool.splice(i,1);
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
            if(this.create)
            {
                obj = this.create(key)
                obj.OP_Init();
            }
        }
        return obj;
    }

    //回收对象
    public recover(o : IObj)
    {
        o.OP_Reset();
        for(var i=0;i < this._pool.length;++i)
        {
            if(this._pool[i] == o)
            {
                return;
            }
        }
        this._pool.push(o);
    }

    //清空对象池
    public clear()
    {
        for(var i=0;i < this._pool.length;++i)
        {
            this._pool[i].OP_OnClear();//调用对象的清理函数，释放对象自身维护的资源
        }
        this._pool.splice(0);
    }
}