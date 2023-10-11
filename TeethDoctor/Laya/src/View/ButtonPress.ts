export default class Butt_XYXZS_onPress extends Laya.Script 
{
    public onP_XYXZS_ress : Function = null; 
    constructor() { super(); }
    protected _own_XYXZS_erSp : Laya.Sprite;
    protected _pr_XYXZS_ess: boolean  = false;
    onAwake()
    {
        this._own_XYXZS_erSp = this.owner as Laya.Sprite;
    }
    
    onEnable(): void 
    {
        this._pr_XYXZS_ess = false;
        this._own_XYXZS_erSp.on(Laya.Event.MOUSE_DOWN,this,this.onD_XYXZS_own)
        this._own_XYXZS_erSp.on(Laya.Event.MOUSE_UP,this,this.on_XYXZS_Up)
        this._own_XYXZS_erSp.on(Laya.Event.MOUSE_OUT,this,this.o_XYXZS_nOut)
        
    }

    
    onDisable(): void 
    {
        this._pr_XYXZS_ess = false;
        this._own_XYXZS_erSp.off(Laya.Event.MOUSE_DOWN,this,this.onD_XYXZS_own)
        this._own_XYXZS_erSp.off(Laya.Event.MOUSE_UP,this,this.on_XYXZS_Up)
        this._own_XYXZS_erSp.off(Laya.Event.MOUSE_OUT,this,this.o_XYXZS_nOut)
    }

    onUpdate()
    {
        if(this._pr_XYXZS_ess && this.onP_XYXZS_ress)
        {
            this.onP_XYXZS_ress();
        }
    }
    protected onD_XYXZS_own()
    {
        this._pr_XYXZS_ess = true;
    }
    protected on_XYXZS_Up()
    {
        this._pr_XYXZS_ess = false;
    }

    protected o_XYXZS_nOut()
    {
        this._pr_XYXZS_ess = false;
    }
}