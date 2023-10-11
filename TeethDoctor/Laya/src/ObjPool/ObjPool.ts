import IO_XYXZS_bj from "./IObj";

export default class Ob_XYXZS_jPool 
{
    protected readonly _po_XYXZS_ol : Array<IO_XYXZS_bj> = new Array<IO_XYXZS_bj>();

    protected _creat_XYXZS_eCaller : any = null;
    protected _crea_XYXZS_teFunc : Function = null;

    //从对象池中获取对象,如果不传入key，则直接返回池中最后一个对象
    //如果对象池为空，并没有 create 函数，则返回 null
    //如果对象池为空，有 create 函数，则调用  create 实例化对象并返回。
    public get(key? : any) : IO_XYXZS_bj
    {
        var obj : IO_XYXZS_bj = null;
        if(null == key)
        {
            obj = this._po_XYXZS_ol.pop();
        }
        else
        {
            for(var i=0;i < this._po_XYXZS_ol.length;++i)
            {
                if(this._po_XYXZS_ol[i].OP_Key() == key)
                {
                    obj = this._po_XYXZS_ol[i];
                    this._po_XYXZS_ol.splice(i,1);
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
            if(this._crea_XYXZS_teFunc)
            {
                obj = this._crea_XYXZS_teFunc.call(this._creat_XYXZS_eCaller,[key])
                obj.OP_Init();
            }
        }
        return obj;
    }

    //回收对象
    public rec_XYXZS_over(o : IO_XYXZS_bj)
    {
        o.OP_Reset();
        for(var i=0;i < this._po_XYXZS_ol.length;++i)
        {
            if(this._po_XYXZS_ol[i] == o)
            {
                return;
            }
        }
        this._po_XYXZS_ol.push(o);
    }

    //清空对象池
    public cl_XYXZS_ear()
    {
        for(var i=0;i < this._po_XYXZS_ol.length;++i)
        {
            this._po_XYXZS_ol[i].OP_OnClear();//调用对象的清理函数，释放对象自身维护的资源
        }
        this._po_XYXZS_ol.splice(0);
    }

    public setCr_XYXZS_eateFunc(caller : any,createFunc : Function)
    {
        this._creat_XYXZS_eCaller = caller;
        this._crea_XYXZS_teFunc = createFunc;
    }
}